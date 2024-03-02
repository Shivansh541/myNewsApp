import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `MyNewsApp - ${this.capitalizeFirst(this.props.category)}`
    }
    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general",

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    async updateNews() {
        this.props.setProgress(10)
        const  url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9f01961bc2749e7890b6a7f943ac11d&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true,page: this.state.page+1 })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.updateNews()
    }
    capitalizeFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page+1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
      };
    render() {
        return (
            <div className='container my-3'>
                <h2>MyNewsApp - Top {this.capitalizeFirst(this.props.category)} Headlines</h2>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">

                    <div className="row my-3">
                        {this.state.articles.map((element) => {
                            return <div key={element.url} className="col-md-4 my-3">
                                <NewsItem author={element.author} date={element.publishedAt} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        })}
                    </div>
                        </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News
