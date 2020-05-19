import React from 'react';
import { Helmet } from "react-helmet";
import tmdb_logo_big from '../../assets/images/tmdb_logo_big.svg';
import Omdb_logo from '../../assets/images/Omdb_logo.png';
import fontAwesomeLogoFullSolid from '../../assets/images/font-awesome-logo-full-solid.svg';
import flaticon from '../../assets/images/flaticon.svg';

const Attributes = () => {
    return (
        <div className="attributes-container">
            <Helmet>
                <title>Attributes</title>
            </Helmet>
            <h1>Thanks to</h1>
            <dl>
                <dt>
                    <b>Appleseeds Academy</b>, for initiating this project
                    <dd>&nbsp;</dd>
                </dt>
                <dt>
                    <b>Pinchas Hodadad</b>, from Appleseeds Academy - for mentoring
                </dt>
            </dl>
            <h2>sources:</h2>
            <dl>
                <dt>
                    <img
                        className="tmdb-img"
                        src={tmdb_logo_big}
                        alt="tmdb logo" />
                    &nbsp;&nbsp;https://www.themoviedb.org/
                </dt>
                <dt>&nbsp;</dt>
                <dt>
                    <img
                        className="omdb-img"
                        src={Omdb_logo}
                        alt="omdb logo"
                    />
                    &nbsp;&nbsp;http://www.omdbapi.com/
                </dt>
                <dt>&nbsp;</dt>
                <dt>
                    <img
                        className="fontawsome-img"
                        src={fontAwesomeLogoFullSolid}
                        alt="fontawsome logo"
                    />
                    &nbsp;&nbsp;https://fontawesome.com/
                </dt>
                <dt>&nbsp;</dt>
                <dt>
                    <img
                        className="flaticon-img"
                        src={flaticon}
                        alt="flaticon logo"
                    />
                    &nbsp;&nbsp;https://www.flaticon.com/
                </dt>
            </dl>
        </div>
    )
}

export default Attributes;