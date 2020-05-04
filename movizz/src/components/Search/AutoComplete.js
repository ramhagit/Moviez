import React, { useState, useEffect } from 'react';
import { tmdbKey } from '../../keys';
import { TMDBAPI } from '../../api';

import './AutoComplete.css';

const AutoComplete = (props) => {
    const { inputValue } = props;
    const [resultsList, setResultsList] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            try {
                if (inputValue) {
                    TMDBAPI.get(`search/movie?api_key=${tmdbKey}&query=${inputValue.replace(' ', '+')}`)
                        .then(response => {
                            setResultsList(response.data.results);
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
    }, [inputValue])

    console.log('inputValue: ', inputValue, 'resultsList: ', resultsList);


    const display = resultsList.length ? resultsList.map(item => {
        return <span className="auto-complete-suggestion">{item.title}</span>
    }) : null;

    return (
        <div className="auto-complete-suggestions">{display}</div>
    )
}

export default AutoComplete;