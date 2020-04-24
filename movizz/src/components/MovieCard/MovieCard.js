import React from 'react';

import './MovieCard.css';

const MovieCard = (props) => {
    const { data } = props;
    const { title, year, runTime, genres, language, rating } = data.card;

    return (
        <div className="movie-card">
            {year && <div className="card__title">{title} ({year})</div>}
            <div className="card__data-line">
                <span className="card__genres">{genres}</span>  |
                <span className="card__runtime">{runTime} </span> |
                <span className="card__languages">{language}</span>
            </div>
            <div className="card__rating">{rating}</div>
        </div>
    );
}

export default MovieCard;