import React from 'react';

import './Thumbnail.css';

const Thumbnail = (props) => {
    const { name, imgSrc, releaseYear, starRate } = props;

    return (
        <div className="thumb">
            <img className="thumb__poster" alt={name} src={imgSrc} />
            <span className="thumb__year">{releaseYear}</span>
            <span className="thumb__rate"><span role="img" aria-label="Star">⭐ </span> {starRate} </span>
            <span className="thumb__title">{name}</span>
        </div>
    )
}

export default Thumbnail;