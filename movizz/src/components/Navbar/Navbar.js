import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search/Search';
import Hamburger from './Hamburger/Hamburger';
import useWidth from '../../hooks/useWidth';
import technology from '../../assets/images/technology.svg'
import './Navbar.css';

const Navbar = () => {
    const width = useWidth();
    return (
        <header>
            <div className="home">
                <Link to="/" ><img className="logo" src={technology} alt="cinema"/></Link>
            </div>
            {width < 650 ? <Hamburger></Hamburger> :
                <>
                    <div className="links">
                        <Link className="link" to="/movies/popular/page/1" >MOVIES</Link>
                        <Link className="link" to="/tv/" >TV SHOWS</Link>
                    </div>
                    <Search />
                </>}
        </header>
    )
}

export default Navbar;