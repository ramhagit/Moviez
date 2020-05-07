import React, { useState, useEffect } from 'react';
import { tmdbKey } from '../../keys';
import { TMDBAPI } from '../../api';
import Pagination from '../Pagination/Pagination';
import ShowList from '../ShowList/ShowList';
import Loader from '../../Loader';

import './SearchResults.css';

const SearchResults = (props) => {
    const { searchQuery, pageNum } = props;
    const [resultsList, setResultsList] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const fetchData = () => {
            try {
                if (searchQuery) {
                    TMDBAPI.get(`search/movie?api_key=${tmdbKey}&query=${searchQuery.split("q=")[1].replace(' ', '+')}&page=${pageNum}`)
                        .then(response => {
                            setResultsList(response.data.results);
                            setNumOfPages(response.data.total_pages);
                            setTotalResults(response.data.total_results);
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
    }, [searchQuery, pageNum])

    // console.log('resultsList: ', resultsList, 'numOfPages: ', numOfPages);

    return (
        <div className="search-results-container">
            <h1 className="search-results__headline">Search Results For:  <b>{searchQuery.split('q=')[1]}</b></h1>
            <h2 className="search-results__num_of_results">({totalResults})</h2>
            {!totalResults ?
                <h1 className="search-results__no_results">No items found</h1>
                : resultsList.length ?
                    <>
                        <Pagination numOfPages={numOfPages} path={`/search/${searchQuery}`} />
                        <ShowList data={resultsList} />
                    </>
                    : <Loader />}
        </div>
    )
}

SearchResults.defaultProps = {
    pageNum: 1
}

export default SearchResults;