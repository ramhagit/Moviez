import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AutoComplete from './AutoComplete';

import './Search.css';

const Search = () => {
    const [value, setValue] = useState('');

    return (
        <div className="search-container">
            <div className="search">
                <input type='text' onChange={e => setValue(e.target.value)} value={value} />
                <Link to={`/search/q=${value}`}>
                    <button onClick={() => { setValue('') }}>SEARCH</button>
                </Link>
            </div>
            <div className="auto-complete-container">
                {value && <AutoComplete inputValue={value} setInputValue={setValue} />}
            </div>
        </div>
    )
}

export default Search;