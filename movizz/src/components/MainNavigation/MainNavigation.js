import React from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = (props) => {
    const { btnList, searchBy, linkPathInitial } = props;

    const buttons = btnList.map(btn => {
        return <Link to={`/${linkPathInitial}/${btn}/page/1`}>
            <button
                className={`nav-btn ${searchBy === btn ? 'active' : ''}`}
            >{btn}</button>
        </Link>
    })

    return (
        <div className="navigation">
            <div className="navigation__buttons">
                {buttons}
                {/* <Link to='/movies/latest/page/1'>
                    <button
                        className={`nav-btn ${searchBy === 'latest' ? 'active' : ''}`}
                    >latest</button>
                </Link>
                <Link to='/movies/top/page/1'>
                    <button
                        className={`nav-btn ${searchBy === 'top' ? 'active' : ''}`}
                    >highest</button>
                </Link>
                <Link to='/movies/popular/page/1'>
                    <button
                        className={`nav-btn ${searchBy === 'popular' ? 'active' : ''}`}
                    >popular</button>
                </Link>
                <Link to='/movies/upcoming/page/1'>
                    <button
                        className={`nav-btn ${searchBy === 'upcoming' ? 'active' : ''}`}
                    >upcoming</button>
                </Link> */}
            </div>
        </div>
    )
}

export default MainNavigation;