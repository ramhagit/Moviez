import React, { useEffect } from 'react';
import { TMDBAPI } from '../../api';
import { tmdbKey } from '../../secrets';
import ShowList from '../ShowList/ShowList';

import './Home.css';

const Home = (props) => {
    const { dataProp, setDataFunc } = props;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await TMDBAPI.get(`movie?api_key=${tmdbKey}&language=en-US&sort_by=release_date.desc&release_date.lte=2020-01-04&vote_average.gte=5.5`);
                const data = response.data.results;
                setDataFunc(data);

                return () => {
                    TMDBAPI.CancelToken.source().cancel();
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [setDataFunc])

    return (
        <div className="home-container">
            <h2>Welcome to MOVIZZZ</h2>
            <ShowList data={dataProp} />
        </div>
    );
}

export default Home;