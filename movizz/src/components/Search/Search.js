import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AutoComplete from './AutoComplete';

const Search = () => {
    const [value, setValue] = useState('');

    return (
        <div className="search-container">
            <div className="search">
                <input type='text' onChange={e => setValue(e.target.value)} />
                <Link to={`/search/q=${value}`}><button>SEARCH</button></Link>
            </div>
            <div className="auto-complete-container">
                {value && <AutoComplete inputValue={value} />}
            </div>
        </div>
    )
}

export default Search;