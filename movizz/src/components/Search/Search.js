import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
    const [value, setValue] = useState('');
    
    return (
        <div className="search">
            <input type='text' onChange={e => setValue(e.target.value)} />
            <Link to={`/search/q=${value}`}><button>SEARCH</button></Link>
        </div>
    )
}

export default Search;