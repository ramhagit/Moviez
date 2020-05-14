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
                <div className="hamburger__links">
                    <Link to="/movies/popular/page/1" >MOVIES</Link>
                </div>
            </div>
        </>
    )
}

export default Hamburger;