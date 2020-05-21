import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../api/base';
import { tmdbKey } from '../../keys';
import { Helmet } from "react-helmet";
import MainHeadline from '../MainHeadline/MainHeadline';
import Loader from '../Loader/Loader';
import ShowList from '../ListDisplay/ShowList/ShowList';

import './MoviesForActor.css';

const MoviesForActor = (props) => {
    const { name } = props;
    const [resultsList, setResultsList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const fetchData = () => {
            try {
                if (name) {
                    TMDBAPI.get(`search/person?api_key=${tmdbKey}&language=en-US&query=${name}&page=1&include_adult=false`)
                        .then(response => {
                            console.log(response.data);

                            setResultsList(response.data.results[0].known_for);
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
    return (
        <>
            <Helmet>
                <title>{`Actor's Movies | ${name.replace('+', ' ')}`}</title>
            </Helmet>
            <div className="movies_for_actor-container">
                <MainHeadline title={name.replace('+', ' ')} />
                <h1 className="search-results__headline">
                        <span className="search-text"><b>best known for movies</b></span>
                </h1>
            </div>
            {resultsList.length ?
                <ShowList data={resultsList} path={`/movies_for_actor/${name}`} />
                : <Loader />}
        </>
    )
}

export default MoviesForActor;