import React from 'react';
import { Helmet } from "react-helmet";
import MainHeadline from '../../MainHeadline/MainHeadline';

import './TVShows.css';

const TVShows = () => {
    return (
        <div className="tv-container">
            <Helmet>
                <title>TV Shows</title>
            </Helmet>
            <MainHeadline title="tv shows" />
            <h1>coming soon</h1>
        </div>
    )
}

export default TVShows;