import React, { useEffect, useState } from 'react';
import { TMDBAPI, OMDBAPI, tmdbImage } from '../../../api/base';
import { tmdbKey, omdbKey } from '../../../keys';
import DisplayMovie from '../DisplayItem/DisplayMovie';
import Loader from '../../Loader/Loader';
import uniqid from "uniqid";

const ItemDetail = (props) => {
    const { itemId } = props;
    const [tmdbData, setTmdbData] = useState({});
    const [omdbData, setOmdbData] = useState({});
    const [data, setMovieData] = useState({});
    const [movieVideos, setMovieVideos] = useState([]);
    const [trailerURL, setTrailerURL] = useState('');
    const backdropSize = 'w1280';
    const posterSize = 'w185';

    useEffect(() => {
        async function getMovieDetails() {
            try {
                const response = await TMDBAPI.get(`movie/${itemId}?api_key=${tmdbKey}`);
                setTmdbData(response.data);

                const anotherResponse = await OMDBAPI.get(`?apikey=${omdbKey}&i=${response.data.imdb_id}`);
                setOmdbData(anotherResponse.data);

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
        getMovieDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId]);

    useEffect(() => {
        const dataObj = {
            backdrop: tmdbData.backdrop_path ? `${tmdbImage}${backdropSize}${tmdbData.backdrop_path}` : null,
            card: {
                title: tmdbData.title,
                year: omdbData.Response === "True" ? omdbData.Year : tmdbData.release_date ?
                    tmdbData.release_date.split('-')[0] : null,
                runTime: omdbData.Response === "True" && omdbData.Runtime !== "N/A" ? omdbData.Runtime :
                    tmdbData.runtime ? `${tmdbData.runtime} min` : 'run time unknown',
                genres: genre(),
                language: languages(),
                rating: ratings()
            },
            tagline: tmdbData.tagline ? `"${tmdbData.tagline}"` : null,
            overview: tmdbData.overview,
            cast: displayCast(),
            poster: omdbData.Response === "True" && omdbData.Poster !== "N/A" ? omdbData.Poster :
                tmdbData.poster_path ? `${tmdbImage}${posterSize}${tmdbData.poster_path}` : null
        }
        setMovieData(dataObj);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tmdbData, omdbData]);

    useEffect(() => {
        getVideosURLs(movieVideos);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieVideos]);

    const getVideosURLs = (videos) => {
        if (videos.length) {
            const videosURLs = videos.map(video => {
                let url = '';
                switch (video.site) {
                    case "YouTube":
                        url = `https://www.youtube.com/watch?v=${video.key}`;
                        break;

                    default:
                        break;
                }
                return url;
            })
            const youtubeTrailersList = videos.filter(video => {
                return video.site === "YouTube" && video.type === "Trailer";
            })
            const youtubeTrailersUrls = youtubeTrailersList.map(trailer => {
                return `https://www.youtube.com/watch?v=${trailer.key}`;
            });
            setTrailerURL(youtubeTrailersUrls[0]);
            console.log('inside getVideosURLs trailerURL: ', trailerURL, 'youtubeTrailersUrls: ', youtubeTrailersUrls);
        }
    }

    const genre = () => {
        return <>
            {
                omdbData.Genre || tmdbData.genres ? tmdbData.genres.map(
                    (genre, index) => {
                        return <span key={uniqid()}>
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
                        return <span key={uniqid()}>
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
                        return <span key={uniqid()}>
                            {
                                index === omdbData.Ratings.length - 1 ?
                                    `${rating.Source} :  ${rating.Value}` :
                                    `${rating.Source} :  ${rating.Value}, `
                            }
                        </span>
                    }) : null
            }
        </>
    }

    const displayCast = () => {
        return <>
            {
                omdbData.Actors && omdbData.Actors !== "N/A" ? omdbData.Actors.split(',').map(
                    item => {
                        return <div key={uniqid()}>{item}</div>
                    }) : ''
            }
        </>
    }

    console.log('TMDB: ', tmdbData, 'OMDB: ', omdbData, 'Videos: ', movieVideos);

    return (
        <>
            {Object.keys(data).length ?
                <DisplayMovie data={data} itemId={itemId} trailerURL={trailerURL} /> :
                <Loader />
            }
        </>
    );
}

export default ItemDetail;