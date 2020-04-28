import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../api';
import { tmdbKey } from '../../keys';
import Carousel from '../Carousel/Carousel';
import Pagination from '../Pagination/Pagination';
import ShowList from '../ShowList/ShowList';
import Loader from '../../Loader';

import './Home.css';

const Home = (props) => {
    const { pageNum } = props;
    const [data, setData] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);

    useEffect(() => {
        const fetchData = () => {
            setData([]);
            try {
                TMDBAPI.get(`movie/now_playing?api_key=${tmdbKey}&language=en-US&region=US&page=${pageNum}`
                ).then(response => {
                    setData(response.data.results);
                    setNumOfPages(response.data.total_pages);
                });

                return () => {
                    TMDBAPI.CancelToken.source().cancel();
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [pageNum])

    return (
        <div className="home-container">
            <Carousel />
            <Pagination numOfPages={numOfPages} path={""} />
            <div className="welcome">Welcome to MovizZ</div>
            {data.length ? <ShowList data={data} /> : <Loader />}
        </div>
    );
}

Home.defaultProps = {
    pageNum: 1
}

export default Home;