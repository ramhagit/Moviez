import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../api';
import { tmdbKey } from '../../secrets';
import ShowList from '../ShowList/ShowList';

import './Home.css';

const Home = () => {
    const [data, setData] = useState([]);
    // const { dataProp, setDataFunc } = props;
    const nowDate = new Date();
    const mm = nowDate.getMonth();
    const dd = nowDate.getDate(); 
    const releaseDateLimit = `${nowDate.getFullYear()}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;
    console.log(releaseDateLimit);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TMDBAPI.get(`discover/movie?api_key=${tmdbKey}&language=en-US&region=US&sort_by=release_date.desc&release_date.lte=${releaseDateLimit}&vote_average.gte=5.5`);
                const fetchedData = response.data.results;
                setData(fetchedData);
                console.log(fetchedData);
                
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
        <div className="home-container">
            <h2>Welcome to MOVIZZZ</h2>
            <ShowList data={data} />
        </div>
    );
}

export default Home;