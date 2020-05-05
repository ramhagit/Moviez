import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../api';
import { tmdbKey } from '../../keys';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import ShowList from '../ShowList/ShowList';
import Loader from '../../Loader';
import { releaseDateLimit } from '../../utils/date';

import './Movies.css';

const Movies = (props) => {
    const { searchBy, pageNum } = props
    const [movieList, setMovieList] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);
    const [searchProp, setSearchProp] = useState('');
    const [path, setPath] = useState('');

    useEffect(() => {
        const common = `?api_key=${tmdbKey}&language=en-US`;

        switch (searchBy) {
            case 'latest':
                setPath("/movies/latest");
                setSearchProp(`discover/movie${common}&sort_by=release_date.desc&release_date.lte=${releaseDateLimit()}&vote_average.gte=5.5`);
                break;

            case 'top':
                setPath("/movies/top");
                setSearchProp(`movie/top_rated${common}`);
                break;

            case 'upcoming':
                setPath("/movies/upcoming");
                setSearchProp(`movie/upcoming${common}`);
                break;

            default:
                setPath("/movies/popular");
                setSearchProp(`movie/popular${common}`);
                break;
        }
    }, [searchBy])

    useEffect(() => {
        const fetchData = () => {
            setMovieList([]);
            setNumOfPages(1);
            try {
                if (searchProp) {
                    TMDBAPI.get(`${searchProp}&page=${pageNum}`).then(response => {
                        setMovieList(response.data.results);
                        setNumOfPages(response.data.total_pages);
                    });
                }

                return () => {
                    TMDBAPI.CancelToken.source().cancel();
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [searchProp, pageNum])

    console.log('searchBy: ', searchBy, 'pageNum: ', pageNum, 'searchProp: ', searchProp, 'movieList: ', movieList);

    return (
        <div>
            {path ?
                <>
                    <div className="navigation">
                        <div className="navigation__buttons">
                            <Link to='/movies/latest/page/1'>
                                <button
                                    className={`nav-btn ${searchBy === 'latest' ? 'active' : ''}`}
                                >latest</button>
                            </Link>
                            <Link to='/movies/top/page/1'>
                                <button
                                    className={`nav-btn ${searchBy === 'top' ? 'active' : ''}`}
                                >high rate</button>
                            </Link>
                            <Link to='/movies/popular/page/1'>
                                <button
                                    className={`nav-btn ${searchBy === 'popular' ? 'active' : ''}`}
                                >popular</button>
                            </Link>
                            <Link to='/movies/upcoming/page/1'>
                                <button
                                    className={`nav-btn ${searchBy === 'upcoming' ? 'active' : ''}`}
                                >upcoming</button>
                            </Link>
                        </div>
                    </div>
                    <Pagination numOfPages={numOfPages} path={path} />
                </> :
                <Loader />}
            {movieList.length ? <ShowList data={movieList} /> : <Loader />}
        </div>
    )
}

export default Movies;
