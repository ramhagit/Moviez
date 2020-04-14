import React, { useEffect, useState } from 'react';
import { TMDBAPI } from '../../api';
import { tmdbKey } from '../../secrets';
import { Link } from 'react-router-dom';

const ItemDetail = (props) => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const id = props.match.params.id;
    console.log(props.match.params.id, id);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await TMDBAPI.get(`movie/${id}?api_key=${tmdbKey}`);
                const fetchedData = response.data;

                console.log('fetchedData: ', fetchedData, 'title: ', fetchedData.title, 'year: ', fetchedData.release_date.split('-')[0]);
                setYear(fetchedData.release_date.split('-')[0]);
                setTitle(fetchedData.title);

                return () => {
                    TMDBAPI.CancelToken.source().cancel();
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h1>ItemDetail</h1>
            <p>title: {title}</p>
            <p>year: {year}</p>
            <Link to='/' >Back to Homepage</Link>
        </div>
    );
}

export default ItemDetail;