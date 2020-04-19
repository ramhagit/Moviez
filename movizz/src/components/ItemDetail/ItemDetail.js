import React, { useEffect, useState } from 'react';
import { TMDBAPI, OMDBAPI, tmdbImage } from '../../api';
import { tmdbKey, omdbKey } from '../../keys';
import { Link } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import Cast from '../Cast/Cast';
import Loader from '../../Loader';

const ItemDetail = (props) => {
    const { itemId } = props;
    const [tmdbData, setTmadbData] = useState({});
    const [omdbData, setOmadbData] = useState({});
    const backdropSize = 'w300';
    const posterSize = 'w185';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await TMDBAPI.get(`movie/${itemId}?api_key=${tmdbKey}`);
                const fetchedData = response.data;
                setTmadbData(fetchedData);

                const anotherResponse = await OMDBAPI.get(`?apikey=${omdbKey}&i=${fetchedData.imdb_id}`)
                const anotherFetchedData = anotherResponse.data;
                setOmadbData(anotherFetchedData);

                return () => {
                    TMDBAPI.CancelToken.source().cancel();
                    OMDBAPI.CancelToken.source().cancel();
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('TMDB: ', tmdbData, 'OMDB: ', omdbData);

    return (
        <div className="item-container">
            {
                Object.keys(tmdbData).length && tmdbData.backdrop_path !== null ?
                    <img alt="TMDB backdrop" src={`${tmdbImage}${backdropSize}${tmdbData.backdrop_path}`} />
                    : tmdbData.backdrop_path === null ? null : <Loader />
            }
            {
                Object.keys(tmdbData).length && Object.keys(omdbData).length ?
                    <MovieCard tmdbData={tmdbData} omdbData={omdbData} /> :
                    <Loader />
            }
            {
                Object.keys(tmdbData).length ?
                    <>
                        <h1>{tmdbData.tagline && `"${tmdbData.tagline}"`}</h1>
                        <p>{tmdbData.overview}</p>
                    </> : <Loader />
            }
            {
                Object.keys(omdbData).length && omdbData.Response === "True" ?
                    <Cast castList={omdbData.Actors} /> : omdbData.Response === "False" ? null : <Loader />
            }
            {
                omdbData.Response === "True" && omdbData.Poster !== "N/A" ?
                    <img alt="OMDB poster" src={omdbData.Poster} />
                    : tmdbData.poster_path ?
                    <img alt="TMDB poster" src={`${tmdbImage}${posterSize}${tmdbData.poster_path}`} /> 
                    : null
            }
            <Link to="/" >Back to Homepage</Link>
        </div>
    );
}

export default ItemDetail;