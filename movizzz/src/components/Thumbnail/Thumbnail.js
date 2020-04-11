import React from 'react';
import { useEffect } from 'react';
import { tmdbImage } from '../api';

import './Thumbnail.css';

const Thumbnail = (props) => {
    const { name, imgSrc, releaseYear, starRate } = props;

    // useEffect(async () => {
    //     try {
    //         const response = await tmdbImage.get(`/w92${path}`);
    //         console.log(response);

    //         return () => {
    //             tmdbImage.CancelToken.source().cancel();
    //         }
    //     } catch (error) { 
    //         console.error(error);
    //     }
    // }, [])

    return (
        <div className="thumb">
            <img className="thumb__poster" alt={name} src={imgSrc} />
            <span className="thumb__year">{releaseYear}</span>
            <span className="thumb__rate"><p>⭐</p> {starRate} </span>
            <span className="thumb__title">{name}</span>
        </div>
    )
}

export default Thumbnail;