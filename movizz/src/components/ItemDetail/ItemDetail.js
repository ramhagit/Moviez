import React, { useEffect, useState } from 'react';
import { TMDBAPI, OMDBAPI } from '../../api';
import { tmdbKey, omdbKey } from '../../secrets';
import { Link } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import Cast from '../Cast/Cast';

const ItemDetail = (props) => {
    const { itemId } = props;
    const [tmdbData, setTmadbData] = useState({});
    const [omdbData, setOmadbData] = useState({});
    const baseImageUrl = 'https://image.tmdb.org/t/p/';
    const backdropSize = 'w300';
    // const posterSize = 'w185';

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
            <img alt="TMDB backdrop" src={`${baseImageUrl}${backdropSize}${tmdbData.backdrop_path}`} />
            {
                Object.keys(tmdbData).length && Object.keys(omdbData).length &&
                <MovieCard tmdbData={tmdbData} omdbData={omdbData} />
            }
            <h1>{tmdbData.tagline && `"${tmdbData.tagline}"`}</h1>
            <p>{tmdbData.overview}</p>
            {
                Object.keys(omdbData).length && omdbData.Response === "True" &&
                <Cast castList={omdbData.Actors} />
            }
            <img alt="OMDB poster" src={omdbData.Poster} />
            <Link to="/" >Back to Homepage</Link>
        </div>
    );
}

export default ItemDetail;