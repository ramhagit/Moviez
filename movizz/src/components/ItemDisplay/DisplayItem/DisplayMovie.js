import React from 'react';

const DisplayMovie = () => {
    return (
        <div className="item-container">
            <div className="item-content">
                {Object.keys(data).length ?
                    <>
                        <div className="item__backdrop">{backdrop}</div>
                        <div className="item__card">{movieCard}</div>
                        <div className="item__tagline">{data.tagline}</div>
                        <div className="item__overview"><div className="overview-content">{data.overview}</div></div>
                        {trailerURL ? <Trailer trailerURL={trailerURL} trailerStyle={trailerStyle} /> : null} 
                        <div className="item__cast">{cast}</div>
                        <div className="item__trailer">{trailerThumb}</div>
                    </> :
                    <Loader />
                }
            </div>
        </div>
    );
}

export default DisplayMovie;