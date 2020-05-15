import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AutoComplete from './AutoComplete';

import './Search.css';

const Search = () => {
    const [value, setValue] = useState('');
    const [reset, setReset] = useState(false);

    useEffect(() => {
        if (reset) {
            setValue('');
        }
        return () => {
            setReset(false);
        }
    }, [reset])

    const handleClick = () => {
        return <Redirect to={`/search/q=${value}`} />
    }

    return (
        <div className="search-container">
            <div className="search">
                <input
                    type="text"
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    onBlur={() => {
                        setTimeout(() => {
                            setReset(true);
                        }, 200);
                    }}
                />
                <Link to={`/search/q=${value}`}>
                    <button onClick={handleClick}><FontAwesomeIcon icon={faSearch} /> Search</button>
                </Link>
            </div>
            <div className="auto-complete-container">
                {value && <AutoComplete inputValue={value} setInputValue={setValue} setReset={setReset} />}
            </div>
        </div>
    )
}

export default Search;