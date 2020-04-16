import React from 'react';

const Movie = (props) => {
    const { movieData } = props;

    return (
        <div>
            <h1>ItemDetail</h1>
            <p>Title: {movieData.title}</p>
            <p>Year: {movieData.release_date.split('-')[0]}</p>
        </div>
    );
}

export default Movie;