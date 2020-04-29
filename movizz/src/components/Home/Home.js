import React, { useState, useEffect } from 'react';
import { TMDBAPI, tmdbImage } from '../../api';
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
    const [coverMovies, setCoverMovies] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            setData([]);
            try {
                TMDBAPI.get(`movie/now_playing?api_key=${tmdbKey}&language=en-US&region=US&page=${pageNum}`
                ).then(response => {
                    setData(response.data.results);
                    setNumOfPages(response.data.total_pages);
                });

                TMDBAPI.get(`movie/now_playing?api_key=${tmdbKey}&language=en-US&vote_average.gte=5`)
                    .then(response => {
                        setCoverMovies(response.data.results);
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

    const coverList = () => {
        const topMovies = coverMovies.filter(item => item.vote_average > 7 && item.backdrop_path);
        const fiveTop = topMovies.length >= 5 ? topMovies.slice(topMovies.length - 6, topMovies.length - 1) : coverMovies.slice(5, 10);
        const disp = fiveTop.map(movie => {
            return (
                <div className="home__cover">
                    <h2>{movie.title}</h2>
                    <img src={`${tmdbImage}w780${movie.backdrop_path}`} />
                </div>
            )
        })

        return disp;
    };

    return (
        <div className="home-container">
            <Carousel displayList={coverList()}/>
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