import React from 'react';

const MovieCard = (props) => {
    const { tmdbData, omdbData } = props;

    const title = tmdbData.title;
    const year = omdbData.Response === "True" ? omdbData.Year : tmdbData.release_date.split('-')[0];
    const runTime = omdbData.Response === "True" && omdbData.Runtime !== "N/A" ? omdbData.Runtime : tmdbData.runtime ? `${tmdbData.runtime} min` : 'run time unknown';

    const genre = omdbData.Genre || tmdbData.genres.length ?
        tmdbData.genres.map((genre, index) => {
            return <>
                {index === tmdbData.genres.length - 1 ? genre.name : `${genre.name}, `}
            </>
        }) : 'No genre available';

    const languages = tmdbData.spoken_languages.length ? tmdbData.spoken_languages.map((language, index) => {
        return <>
            {index === tmdbData.spoken_languages.length - 1 ? language.name : `${language.name}, `}
        </>
    }) : omdbData.Language || 'Language unknown';

    const ratings = omdbData.Response === "True" && omdbData.Ratings.length ? omdbData.Ratings.map((rating, index) => {
        return <>
            {index === omdbData.Ratings.length - 1 ? `${rating.Source} :  ${rating.Value}` : `${rating.Source} :  ${rating.Value}, `}
        </>
    }) : null;

    return (
        <div className="movie-card">
            <h1>{title} ({year})</h1>
            <p>{genre}  |  {runTime}  |  {languages}</p>
            <p>{ratings}</p>
        </div>
    );
}

export default MovieCard;