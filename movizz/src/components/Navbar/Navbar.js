import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search/Search';

import './Navbar.css';

const Navbar = () => {
    return (
        <header>
            <div className="home">
                <Link to="/" ><FontAwesomeIcon icon={faHome} /></Link>
                {/* <Link to="/" ><span role="img" aria-label="Home">🏠 </span>Home</Link> */}
            </div>
            <div className="links">
                <Link to="/movies/popular/page/1" >MOVIES</Link>
            </div>
            <Search />
        </header>
    )
}

export default Navbar;