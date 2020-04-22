import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../api';
import { tmdbKey } from '../../keys';
import ShowList from '../ShowList/ShowList';
import Loader from '../../Loader';

import './Home.css';

const Home = (props) => {
    const { pageNum } = props;
    const [data, setData] = useState([]);
    const nowDate = new Date();
    const mm = nowDate.getMonth();
    const dd = nowDate.getDate(); 
    const releaseDateLimit = `${nowDate.getFullYear()}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;
    // console.log(pageNum);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TMDBAPI.get(`discover/movie?api_key=${tmdbKey}&language=en-US&region=US&sort_by=release_date.desc&release_date.lte=${releaseDateLimit}&vote_average.gte=5.5&page=${pageNum}`);
                const fetchedData = response.data.results;
                setData(fetchedData);
                console.log(response.data);
                
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
            <div className="welcome">Welcome to MovizZ</div>
            {data.length ?  <ShowList data={data} /> : <Loader />}
        </div>
    );
}

Home.defaultProps = {
    pageNum: 1
}

export default Home;