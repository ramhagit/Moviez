import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                        }, 500);
                    }}
                />
                <Link to={`/search/q=${value}`}>
                    <button onClick={() => { setValue('') }}>SEARCH</button>
                </Link>
            </div>
            <div className="auto-complete-container">
                {value && <AutoComplete inputValue={value} setInputValue={setValue} setReset={setReset} />}
            </div>
        </div>
    )
}

export default Search;