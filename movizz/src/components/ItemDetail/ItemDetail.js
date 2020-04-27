import React, { useEffect, useState } from 'react';
import { TMDBAPI, OMDBAPI, tmdbImage } from '../../api';
import { tmdbKey, omdbKey } from '../../keys';
import MovieCard from '../MovieCard/MovieCard';
import Cast from '../Cast/Cast';
import Loader from '../../Loader';

import './ItemDetail.css';

const ItemDetail = (props) => {
    const { itemId } = props;
    const [tmdbData, setTmadbData] = useState({});
    const [omdbData, setOmadbData] = useState({});
    const [movieVideos, setMovieVideos] = useState({});
    const [data, setData] = useState({});
    const backdropSize = 'w1280';
    const posterSize = 'w185';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await TMDBAPI.get(`movie/${itemId}?api_key=${tmdbKey}`);
                const fetchedData = response.data;
                setTmadbData(fetchedData);

                const anotherResponse = await OMDBAPI.get(`?apikey=${omdbKey}&i=${fetchedData.imdb_id}`)
                const anotherFetchedData = anotherResponse.data;
                setOmadbData(anotherFetchedData);

                //https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=5dc629ddd638c7ad0b2708391cad5c5b&language=en-US
                const res = await TMDBAPI.get(`movie/${itemId}/videos?api_key=${tmdbKey}&language=en-US`);
                setMovieVideos(res.data.results);

                return () => {
                    TMDBAPI.CancelToken.source().cancel();
                    OMDBAPI.CancelToken.source().cancel();
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const dataObj = {
            backdrop: `${tmdbImage}${backdropSize}${tmdbData.backdrop_path}`,
            card: {
                title: tmdbData.title,
                year: omdbData.Response === "True" ? omdbData.Year : tmdbData.release_date ? tmdbData.release_date.split('-')[0] : null,
                runTime: omdbData.Response === "True" && omdbData.Runtime !== "N/A" ? omdbData.Runtime : tmdbData.runtime ? `${tmdbData.runtime} min` : 'run time unknown',
                genres: genre(),
                language: languages(),
                rating: ratings()
            },
            tagline: tmdbData.tagline ? `"${tmdbData.tagline}"` : null,
            overview: tmdbData.overview,
            cast: displayCast()
        }
        setData(dataObj);
    }, [omdbData])

    const genre = () => {
        return <>
            {
                omdbData.Genre || tmdbData.genres ? tmdbData.genres.map(
                    (genre, index) => {
                        return <span>
                            {index === tmdbData.genres.length - 1 ? genre.name : `${genre.name}, `}
                        </span>
                    }) : 'No genre available'
            }
        </>
    }

    const languages = () => {
        return <>
            {
                tmdbData.spoken_languages ? tmdbData.spoken_languages.map(
                    (language, index) => {
                        return <span>
                            {index === tmdbData.spoken_languages.length - 1 ? language.name : `${language.name}, `}
                        </span>
                    }) : omdbData.Language || 'Language unknown'
            }
        </>
    }

    const ratings = () => {
        return <>
            {
                omdbData.Response === "True" && omdbData.Ratings.length ? omdbData.Ratings.map(
                    (rating, index) => {
                        return <>
                            {
                                index === omdbData.Ratings.length - 1 ?
                                    `${rating.Source} :  ${rating.Value}` :
                                    `${rating.Source} :  ${rating.Value}, `
                            }
                        </>
                    }) : null
            }
        </>
    }

    const displayCast = () => {
        return <>
            {
                omdbData.Actors && omdbData.Actors !== "N/A" ? omdbData.Actors.split(',').map(
                    item => {
                        return <div key={item}>{item}</div>
                    }) : ''
            }
        </>
    }

    console.log('TMDB: ', tmdbData, 'OMDB: ', omdbData, 'Videos: ', movieVideos);

    const backdrop = tmdbData.backdrop_path ?
        <img alt={tmdbData.backdrop_path ? "TMDB backdrop" : null} src={data.backdrop} className="backdropImg" />
        || <Loader /> : null;

    const movieCard = Object.keys(data).includes('card') && <MovieCard data={data} /> || <Loader />;

    const cast = Object.keys(data).includes('cast') && <Cast castList={data.cast} /> || <Loader />;

    const trailerThumb = omdbData.Response === "True" && omdbData.Poster !== "N/A" ?
        <img alt="OMDB poster" src={omdbData.Poster} className="posterImg" /> :
        tmdbData.poster_path ?
            <img alt="TMDB poster" src={`${tmdbImage}${posterSize}${tmdbData.poster_path}`} className="posterImg" /> :
            null;


    return (
        <div className="item-container">
            <div className="item-content">
                {Object.keys(data).length ?
                    <>
                        <div className="item__backdrop">{backdrop}</div>
                        <div className="item__card">{movieCard}</div>
                        <div className="item__tagline">{data.tagline}</div>
                        <div className="item__overview">{data.overview}</div>
                        <div className="item__cast">{cast}</div>
                        <div className="item__trailer">{trailerThumb}</div>
                    </> :
                    <Loader />
                }
            </div>
        </div>
    );
}

export default ItemDetail;