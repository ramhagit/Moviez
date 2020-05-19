import React from 'react';
import tmdb_logo_big from '../../assets/images/tmdb_logo_big.svg';
import Omdb_logo from '../../assets/images/Omdb_logo.png';

const Attributes = () => {
    return (
        <>
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
                    &nbsp;https://www.themoviedb.org/
                </dt>
                <dt>&nbsp;</dt>
                <dt>
                    <img
                        className="omdb-img"
                        src={Omdb_logo}
                        alt="omdb logo" />
                    &nbsp;http://www.omdbapi.com/
                </dt>
                <dt>&nbsp;</dt>
                <dt>https://fontawesome.com/</dt>
                <dt>&nbsp;</dt>
                <dt>https://www.flaticon.com/</dt>
            </dl>
        </>
    )
}

export default Attributes;