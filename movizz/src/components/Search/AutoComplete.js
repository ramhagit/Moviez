import React, { useState, useEffect } from 'react';
import { tmdbKey } from '../../keys';
import { TMDBAPI } from '../../api';
import { Link } from 'react-router-dom';

import './AutoComplete.css';

const AutoComplete = (props) => {
    const { inputValue, setInputValue } = props;
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
        return <span
            className="auto-complete-suggestion"
            key={item.title}
            data-title={item.title}
            onClick={e => { setInputValue(e.target.dataset.title) }}
        >
            {item.title.length > 20 ? `${item.title.substring(0, 19)} ` : `${item.title} `}
            <Link to={`/movie/${item.id}`} key={item.id}>
                <span
                    role="img"
                    aria-label="Drop"
                    onClick={() => {
                        console.log('hello');
                        setInputValue('')
                    }}
                >💧</span>
            </Link>

        </span>
    }) : null;

    return (
        <div className="auto-complete-suggestions">{display}</div>
    )
}

export default AutoComplete;