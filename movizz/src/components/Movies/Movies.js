import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../api';
import { tmdbKey } from '../../keys';
import Pagination from '../Pagination/Pagination';
import ShowList from '../ShowList/ShowList';
import Loader from '../../Loader';

const Movies = (props) => {
    const { searchBy, pageNum } = props
    const [movieList, setMovieList] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);
    const [searchProp, setSearchProp] = useState('');

    useEffect(() => {
        switch (searchBy) {
            case 'latest':
                setSearchProp('&sort_by=release_date.desc');
                break;

            default:
                setSearchProp('&sort_by=release_date.desc');
                break;
        }
    }, [searchBy])

    useEffect(() => {
        const fetchData = () => {
            setMovieList([]);
            try {
                TMDBAPI.get(`discover/movie?api_key=${tmdbKey}&language=en-US&region=US&page=${pageNum}${searchProp}`
                ).then(response => {
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
    }, [pageNum])

    return (
        <div>
            <Pagination numOfPages={numOfPages} />
            {movieList.length ? <ShowList data={movieList} /> : <Loader />}
        </div>
    )
}

Movies.defaultProps = {
    searchBy: 'latest',
    pageNum: 1
}

export default Movies;
