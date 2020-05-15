import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import './Hamburger.css';

const Hamburger = () => {
    const hamIconRef = useRef(null);
    const sideMenuRef = useRef(null);

    const handleClick = () => {
        const hamIcon = hamIconRef.current;
        hamIcon.classList.toggle("clicked");
        const sideMenu = sideMenuRef.current;
        sideMenu.classList.toggle("show");
    }

    return (
        <>
            <div className="hamburger">
                <div
                    className="ham-icon"
                    ref={hamIconRef}
                    onClick={handleClick}
                >
                    <span className="ham_slice"></span>
                </div>
            </div>
            <div className="side-menu" ref={sideMenuRef}>
                <Search />
                <ul className="hamburger__links" onClick={handleClick} >
                    <li className="hamburger__link"><Link to="/" ><u>HOME</u></Link></li>
                    <li className="hamburger__link"><Link to="/movies/popular/page/1" ><u>MOVIES</u></Link></li>
                    <li className="hamburger__link">TV SHOWS</li>
                </ul>
            </div>
        </>
    )
}

export default Hamburger;