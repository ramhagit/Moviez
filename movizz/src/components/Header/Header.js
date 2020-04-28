import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="home">
                <Link to="/" ><span role="img" aria-label="Home">🏠 </span>Home</Link>
            </div>
            <div className="links">
                <Link to="/movies/popular/page/1" >MOVIES</Link>
            </div>
        </header>
    )
}

export default Header;