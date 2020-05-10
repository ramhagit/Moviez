import React, { useState, useEffect } from 'react';
import { tmdbKey } from '../../keys';
import { TMDBAPI, tmdbImage } from '../../api';
import { Link } from 'react-router-dom';

import './AutoComplete.css';

const AutoComplete = (props) => {
    const { inputValue, setInputValue, setReset } = props;
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

    // console.log('inputValue: ', inputValue, 'resultsList: ', resultsList);

    const display = resultsList.length ? resultsList.map(item => {
        return <span
            className="auto-complete-suggestion"
            key={item.title}
            data-title={item.title}
            onClick={e => {
                const newInputValue = e.target.dataset.title;
                setTimeout(() => {
                    setInputValue(newInputValue);
                }, 250)
            }}
        >
            {item.title.length > 18 ? `${item.title.substring(0, 18)}` : item.title}
            <Link to={`/movie/${item.id}`} key={item.id} onMouseUp={() => { setReset(true) }}>
                <img src={`${tmdbImage}w92${item.poster_path}`} alt={item.poster_path ? item.title : ''} />
            </Link>

        </span>
    }) : null;

    return (
        <div className="auto-complete-suggestions">{display}</div>
    )
}

export default AutoComplete;