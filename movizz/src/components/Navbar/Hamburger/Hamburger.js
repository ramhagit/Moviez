import React, { useRef } from 'react';
import Search from '../Search/Search';
import './Hamburger.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

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
            <div className="side-menu" ref={sideMenuRef}>Side menU
            <Search />
            </div>
        </>
    )
}

export default Hamburger;