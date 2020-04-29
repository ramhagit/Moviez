import React, { useState, useEffect } from 'react';
import { TMDBAPI, tmdbImage } from '../../api';
import { tmdbKey } from '../../keys';

const Carousel = () => {
    const [displayMovies, setDisplayMovies] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            try {
                TMDBAPI.get(`movie/now_playing?api_key=${tmdbKey}&language=en-US&vote_average.gte=5`)
                    .then(response => {
                        console.log(response.data.results);
                        
                        setDisplayMovies(response.data.results);
                    });

                return () => {
                    TMDBAPI.CancelToken.source().cancel();
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const topMovies = displayMovies.filter(item => item.vote_average > 7 && item.backdrop_path);
    const fiveTop = topMovies.length >= 5 ? topMovies.slice(topMovies.length-6, topMovies.length-1) : displayMovies.slice(5, 10);
    const disp = fiveTop.map(movie => {
        return (
            <>
            <h2>{movie.title}</h2>
            <img src={`${tmdbImage}w780${movie.backdrop_path}`} />
            </>
        )
    })
    return (
    <>{disp}</>
    )
}

export default Carousel;