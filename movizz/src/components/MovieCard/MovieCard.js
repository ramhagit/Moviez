import React from 'react';

const MovieCard = (props) => {
    const { title, year, runTime, genres, language, rating } = props.card;

    return (
        <div className="movie-card">
            {year && <h1>{title} ({year})</h1>}
            <p>{genres}  |  {runTime}  |  {language}</p>
            <p>{rating}</p>
        </div>
    );
}

export default MovieCard;