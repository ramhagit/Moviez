import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { tmdbKey } from '../../../keys';
import { TMDBAPI } from '../../../api/base';
import Pagination from '../../ListDisplay/Pagination/Pagination';
import ShowList from '../../ListDisplay/ShowList/ShowList';
import MainHeadline from '../../MainHeadline/MainHeadline';
import Loader from '../../Loader/Loader';

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
                    TMDBAPI.get(`search/movie?api_key=${tmdbKey}&query=${searchQuery.split("q=")[1].replace(' ', '+').replace('%20', '+')}&page=${pageNum}`)
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
            <Helmet>
                <title>Search Results</title>
            </Helmet>
            <MainHeadline title="search results" />
            <h1 className="search-results__headline">for:&nbsp;&nbsp;
                <span className="search-text"><b>{searchQuery.split('q=')[1]}</b></span>
            </h1>
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