import React from 'react';
import Loader from '../../Loader/Loader';
import MovieCard from '../MovieCard/MovieCard';
import Cast from '../Cast/Cast';
import Trailer from '../Trailer/Trailer';

import './DisplayMovie.css';

const DisplayMovie = (props) => {
    const { data, itemId, trailersURL } = props;

    const movieCard = Object.keys(data).includes('card') ? <MovieCard data={data.card} /> : <Loader />;

    const cast = Object.keys(data).includes('cast') ? <Cast castList={data.cast} movieId={itemId} /> : <Loader />;

    return (
        <div className="item-container">
            <div className="item-content">
                <div className="item__backdrop">
                    <img alt="" src={data.backdrop} className="backdropImg" />
                </div>
                <div className="item__card">
                    {movieCard}
                </div>
                <div className="item__tagline">
                    {data.tagline}
                </div>
                <div className="item__overview">
                    <div className="overview-content">
                        {data.overview}
                    </div>
                </div>
                <div className="item__trailer">
                    <Trailer trailersURL={trailersURL} />
                </div>
                <div className="item__cast">
                    {cast}
                </div>
                <div className="item__trailer_thumb">
                    <img alt="" src={data.poster} className="posterImg" />
                </div>
            </div>
        </div>
    );
}

export default DisplayMovie;
