import React from 'react';

import './MainHeadline.css';

const MainHeadline = (props) => {
    const { title } = props;

    return (
        <h1 className="main-headline">
            <span className="headline-capital">{title.substring(0, 1).toUpperCase()}</span>
            <span className="headline-rest">{title.substring(1, title.length)}</span>
        </h1>
    )
}

export default MainHeadline;