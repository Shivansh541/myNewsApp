import React, { Component } from 'react'
import {
    Link,
} from "react-router-dom"
export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date } = this.props
        return (
            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imageUrl?imageUrl:"https://i0.wp.com/www.shaharbeen.com/wp-content/uploads/2018/09/breakingghkzks.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className='cart-text'><small className='text-muted'>By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                        <Link to={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
