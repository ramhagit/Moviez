import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../api';
import { tmdbKey } from '../../keys';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import ShowList from '../ShowList/ShowList';
import Loader from '../../Loader';

import './Movies.css';

const Movies = (props) => {
    const { searchBy, pageNum } = props
    const [movieList, setMovieList] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);
    const [searchProp, setSearchProp] = useState(`movie/upcoming?api_key=${tmdbKey}&language=en-US&region=US&page=${pageNum}`);
    const [path, setPath] = useState("/movies");

    const currentDate = new Date().toISOString();
    // console.log('currentDate: ', currentDate);

    const releaseDateLimit = () => {
        const nowDate = new Date();
        const mm = nowDate.getMonth();
        const dd = nowDate.getDate();
        return `${nowDate.getFullYear()}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;
    }

    useEffect(() => {
        switch (searchBy) {
            case 'latest':
                // setSearchProp(`discover/movie?api_key=${tmdbKey}&language=en-US&region=US&page=${pageNum}&sort_by=primary_release_date.desc&primary_release_date.lte=${new Date().toISOString().split('T')[0]}`);
                setSearchProp(`discover/movie?api_key=${tmdbKey}&language=en-US&region=US&sort_by=release_date.desc&release_date.lte=${releaseDateLimit()}&vote_average.gte=5.5&page=${pageNum}`);
                setPath("/movies/latest");
                break;

            case 'top':
                setSearchProp(`movie/top_rated?api_key=${tmdbKey}&language=en-US&page=${pageNum}`);
                setPath("/movies/top");
                break;

            // default:
            //     setSearchProp(`movie/now_playing?api_key=${tmdbKey}&language=en-US&page=${pageNum}`);
            //     break;
        }
    }, [searchBy])

    useEffect(() => {
        const fetchData = () => {
            setMovieList([]);
            setNumOfPages(1);
            try {
                // TMDBAPI.get(`discover/movie?api_key=${tmdbKey}&language=en-US&region=US&page=${pageNum}${searchProp}`
                // TMDBAPI.get(`movie/top_rated?api_key=${tmdbKey}&language=en-US&region=US&page=${pageNum}${searchProp}`
                //https://api.themoviedb.org/3/movie/top_rated?api_key=5dc629ddd638c7ad0b2708391cad5c5b&language=en-US&page=1
                // TMDBAPI.get(`movie/top_rated?api_key=${tmdbKey}&language=en-US&page=${pageNum}`
                //https://api.themoviedb.org/3/movie/latest?api_key=5dc629ddd638c7ad0b2708391cad5c5b&language=en-US
                // TMDBAPI.get(`movie/now_playing?api_key=${tmdbKey}&language=en-US&page=${pageNum}`
                TMDBAPI.get(searchProp).then(response => {
                    setMovieList(response.data.results);
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
    }, [pageNum, searchProp])

    console.log('searchBy: ', searchBy, 'searchProp: ', searchProp, 'movieList: ', movieList);

    return (
        <div>
            <div className="navigation">
                <div className="navigation__buttons">
                    <Link to='/movies/latest/page/1'><button>latest movies</button></Link>
                    <Link to='/movies/top/page/1'><button>highest rating</button></Link>
                </div>
            </div>
            <Pagination numOfPages={numOfPages} path={path} />
            {movieList.length ? <ShowList data={movieList} /> : <Loader />}
        </div>
    )
}

Movies.defaultProps = {
    searchBy: '',
    pageNum: 1
}

export default Movies;
