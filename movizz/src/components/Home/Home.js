import React, { useState, useEffect } from 'react';
import { TMDBAPI, tmdbImage } from '../../api/base';
import { tmdbKey } from '../../keys';
import { tmdbNowPlaying } from '../../api/tmdb';
import Carousel from '../Carousel/Carousel';
import Pagination from '../Pagination/Pagination';
import ShowList from '../ShowList/ShowList';
import Loader from '../Loader/Loader';

import './Home.css';

const Home = (props) => {
    const { pageNum } = props;
    const [data, setData] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);
    const [coverMovies, setCoverMovies] = useState([]);
    const [carouselActiveIndex, setCarouselActiveIndex] = useState(2);

    useEffect(() => {
        const fetchData = () => {
            try {
                tmdbNowPlaying(pageNum).then(response => {
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
                {
                    title: movie.title.length < 20 ? movie.title : `${movie.title.substring(0,19)}`,
                    year: movie.release_date.split('-')[0],
                    rate: movie.vote_average,
                    img_src: `${tmdbImage}w780${movie.backdrop_path}`,
                    link_path: `/movie/${movie.id}`
                }
            )
        })

        return disp;
    };

    return (
        <div className="home-container">
            <Carousel
                displayList={coverList()}
                activeIndex={carouselActiveIndex}
                setActiveIndex={setCarouselActiveIndex}
            />
            <div className="welcome">Welcome to MovizZ</div>
            <Pagination numOfPages={numOfPages} path={""} />
            {data.length ? <ShowList data={data} /> : <Loader />}
        </div>
    );
}

Home.defaultProps = {
    pageNum: 1
}

export default Home;