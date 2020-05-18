import React from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = (props) => {
    const { btnList, searchBy, linkPathInitial } = props;

    const buttons = btnList.map(btn => {
        return <Link to={`/${linkPathInitial}/${btn.prop}/page/1`}>
            <button
                className={`nav-btn ${searchBy === btn.prop ? 'active' : ''}`}
            >{btn.displayTitle}</button>
        </Link>
    })

    return (
        <div className="navigation">
            <div className="navigation__buttons">
                {buttons}
            </div>
        </div>
    )
}

export default MainNavigation;