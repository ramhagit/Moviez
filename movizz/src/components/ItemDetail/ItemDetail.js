import React, { useEffect, useState } from 'react';
import { TMDBAPI, OMDBAPI } from '../../api';
import { tmdbKey, omdbKey } from '../../secrets';
import { Link } from 'react-router-dom';

const ItemDetail = (props) => {
    const { itemId } = props;
    const [tmdbData, setTmadbData] = useState({});
    const [omdbData, setOmadbData] = useState({});
    // const [title, setTitle] = useState('');
    // const [year, setYear] = useState('');
    const baseImageUrl = 'https://image.tmdb.org/t/p/';
    const backdropSize = 'w300';
    // const posterSize = 'w185';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await TMDBAPI.get(`movie/${itemId}?api_key=${tmdbKey}`);
                const fetchedData = response.data;

                setTmadbData(fetchedData);
                // setYear(fetchedData.release_date.split('-')[0]);
                // setTitle(fetchedData.title);

                // const anotherResponse = await OMDBAPI.get(`?apikey=${omdbKey}&t=${fetchedData.title.replace(' ', '+')}&y=${fetchedData.release_date.split('-')[0]}`)
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
        <div>
            <h1>ItemDetail</h1>
            <p>Title: {tmdbData.title}</p>
            <p>Year: {Object.keys(omdbData).includes('Year') ? omdbData.Year : 'ERROR'}</p>
            <p>Run Time: {omdbData.Runtime}</p>
            <img alt="TMDB backdrop" src={`${baseImageUrl}${backdropSize}${tmdbData.backdrop_path}`} />
            <img alt="OMDB poster" src={omdbData.Poster} />
            <Link to="/" >Back to Homepage</Link>
        </div>
    );
}

export default ItemDetail;