import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../api/base';
import { tmdbKey } from '../../keys';
import { Helmet } from "react-helmet";
import MainHeadline from '../MainHeadline/MainHeadline';
import Loader from '../Loader/Loader';
import ShowList from '../ListDisplay/ShowList/ShowList';

import './MoviesForActor.css';

const MoviesForActor = (props) => {
    const { id, name, pageNum } = props;
    const [resultsList, setResultsList] = useState([]);
    const [bestKnownForList, setBestKnownForList] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const fetchData = () => {
            try {
                if (name) {
                    TMDBAPI.get(`search/person?api_key=${tmdbKey}&language=en-US&query=${name}&page=1&include_adult=false`)
                        .then(response => {
                            console.log('by name: ', response.data);
                            setBestKnownForList(response.data.results[0].known_for);
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
    }, [name])

    useEffect(() => {
        const fetchData = () => {
            try {
                if (id) {
                    // discover/movie?api_key=${ApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_cast=${id}`
                    // TMDBAPI.get(`search/person?api_key=${tmdbKey}&language=en-US&query=${name}&page=1&include_adult=false`)
                    TMDBAPI.get(`discover/movie?api_key=${tmdbKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}&with_cast=${id}`)
                        .then(response => {
                            console.log('by id: ', response.data);
                            setResultsList(response.data.results);
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
    }, [id, pageNum])

    console.log('resultsList: ', resultsList);

    return (
        <>
            <Helmet>
                <title>{`Actor's Movies | ${name.replace('+', ' ')}`}</title>
            </Helmet>
            <div className="movies_for_actor-container">
                <MainHeadline title={name.replace('+', ' ')} />
                <h1 className="search-results__headline">
                    <span className="search-text"><b>{resultsList.length ? 'featuring movies' : 'best known for movies'}</b></span>
                </h1>
            </div>
            {resultsList.length ?
                <ShowList data={resultsList} numOfPages={numOfPages} path={`/movies_for_actor/${name}/${id}`} />
                : bestKnownForList.length ?
                    <ShowList data={bestKnownForList} path={`/movies_for_actor/${name}/${id}`} />
                    : <Loader />}
        </>
    )
}

MoviesForActor.defaultProps = {
    pageNum: 1,
    name: '',
    id: 0
}

export default MoviesForActor;