import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
    const [value, setValue] = useState('');

    const handleChange = () => {
        return false;
    }

    return (
        <div className="search">
            <input type='text' />
            <button>SEARCH</button>
        </div>
    )
}

export default Search;