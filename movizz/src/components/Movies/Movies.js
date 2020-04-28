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
    const [searchProp, setSearchProp] = useState(`movie/upcoming?api_key=${tmdbKey}&language=en-US&region=US`);
    const [path, setPath] = useState("/movies/upcoming");

    useEffect(() => {
        switch (searchBy) {
            case 'latest':
                setSearchProp(`discover/movie?api_key=${tmdbKey}&language=en-US&region=US&sort_by=release_date.desc&release_date.lte=${releaseDateLimit()}&vote_average.gte=5.5`);
                setPath("/movies/latest");
                break;

            case 'top':
                setSearchProp(`movie/top_rated?api_key=${tmdbKey}&language=en-US`);
                setPath("/movies/top");
                break;
        }
    }, [searchBy])

    useEffect(() => {
        const fetchData = () => {
            setMovieList([]);
            setNumOfPages(1);
            try {
                TMDBAPI.get(`${searchProp}&page=${pageNum}`).then(response => {
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
    }, [searchProp, pageNum])

    // console.log('searchBy: ', searchBy, 'pageNum: ', pageNum, 'searchProp: ', searchProp, 'movieList: ', movieList);

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
    pageNum: 1
}

export default Movies;
