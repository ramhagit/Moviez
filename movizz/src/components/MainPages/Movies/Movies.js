import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../../api/base';
import { tmdbKey } from '../../../keys';
import ShowList from '../../ListDisplay/ShowList/ShowList';
import Loader from '../../Loader/Loader';
import MainHeadline from '../../MainHeadline/MainHeadline';
import MainNavigation from '../../MainNavigation/MainNavigation';
import { releaseDateLimit } from '../../../utils/date';

import './Movies.css';

const Movies = (props) => {
    const { searchBy, pageNum } = props
    const [movieList, setMovieList] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);
    const [searchProp, setSearchProp] = useState('');
    const [path, setPath] = useState('');
    const btnList = ['latest', 'top', 'popular', 'upcoming'];

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
        const getMoviesData = () => {
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
        getMoviesData();
    }, [searchProp, pageNum])
    
    console.log('searchBy: ', searchBy, 'pageNum: ', pageNum, 'searchProp: ', searchProp, 'movieList: ', movieList);

    return (
        <div>
            {path ?
                <div className="movies-container">
                    <MainHeadline title="movies" />
                    <MainNavigation btnList={btnList} searchBy={searchBy} linkPathInitial="movies"/>
                </div> :
                <Loader />
            }
            {
                movieList.length ?
                    <ShowList data={movieList} numOfPages={numOfPages} path={path} /> :
                    <Loader />
            }
        </div>
    )
}

export default Movies;
