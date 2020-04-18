import React from 'react';

const MovieCard = (props) => {
    const { tmdbData, omdbData } = props;
    const title = tmdbData.title;
    const year = tmdbData.release_date.split('-')[0];
    let genre = omdbData.Genre;
    const runTime = omdbData.Response === "True" && omdbData.Runtime !== "N/A" ? omdbData.Runtime : tmdbData.runtime ? `${tmdbData.runtime} min` : 'run time unknown';
    let languages = omdbData.Language;

    genre = genre || tmdbData.genres.length ?
        tmdbData.genres.map((genre, index) => {
            return <>
                {index === tmdbData.genres.length - 1 ? genre.name : `${genre.name}, `}
            </>
        }) : 'No genre available';

    languages = tmdbData.spoken_languages.length ? tmdbData.spoken_languages.map((language, index) => {
        return <>
            {index === tmdbData.spoken_languages.length - 1 ? language.name : `${language.name}, `}
        </>
    }) : languages || 'Language unknown';

    return (
        <div className="movie-card">
            <h1>{title} ({year})</h1>
            <p>{genre}  |  {runTime}  |  {languages}</p>
        </div>
    );
}

export default MovieCard;