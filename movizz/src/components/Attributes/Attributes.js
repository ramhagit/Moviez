import React from 'react';
import tmdb_logo from '../../assets/images/tmdb_logo.svg';
import tmdb_logo_big from '../../assets/images/tmdb_logo_big.svg';

const Attributes = () => {
    return (
        <>
            <h1>Thanks to</h1>
            <dl>
                <dt>
                    <b>Appleseeds Academy</b>, for initiating this project
                </dt>
                <dt>
                    <b>Pinchas Hodadad</b>, from Appleseeds Academy - for mentoring
                </dt>
                <dt></dt>
            </dl>
            <h2>sources:</h2>
            <dl>
                <dt><img
                    className="tmdb-img"
                    src={tmdb_logo_big}
                    alt="tmdb logo" />
                    &nbsp;https://www.themoviedb.org/
                </dt>
            </dl>
        </>
    )
}

export default Attributes;