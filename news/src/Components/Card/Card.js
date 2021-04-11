import React from 'react';
import './Card.css';

const Card = (props) => {
    const handleDateFormat = (dateTime) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateTime);
        return `${months[date.getMonth()+1]} ${date.getDate()} ${new Date().getFullYear()}`;
    }
    return (
        <div className="card">
            <div className="image">
                <img src={props.detail.urlToImage} alt="" />
                <span className="popular-tag">Most Popular</span>
            </div>
            <div className="content">
                <h2 title={props.detail.title}>{props.detail.title}</h2>
                <p>{props.detail.description}</p>
            </div>
            <div className="detail" title="Click more to read">
                <div className="author">
                    {props.detail.urlToImage ? <img src={props.detail.urlToImage} alt="" /> : null}
                    <div>
                        <h3>{props.detail.author}</h3>
                        <h4>{handleDateFormat(props.detail.publishedAt)} - 5 min read</h4>
                    </div>
                </div>
                <div className="share">
                    <a href={props.detail.url} target="_blank" rel="noreferrer" title="Read More">more...</a>
                </div>
            </div>
        </div>
    )
}

export default Card
