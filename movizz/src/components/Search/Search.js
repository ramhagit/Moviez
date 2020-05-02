import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
    const [value, setValue] = useState('');

    const handleChange = () => {
        return false;
    }

    return (
        <>
            <input type='text' />
            <button>SEARCH</button>
        </>
    )
}

export default Search;