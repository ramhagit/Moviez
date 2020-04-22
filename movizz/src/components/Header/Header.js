import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="home">
                <Link to="/" >Home</Link>
            </div>
            <div className="links">
                
            </div>
        </header>
    )
}

export default Header;