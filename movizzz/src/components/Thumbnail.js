import React from 'react';
import { useEffect } from 'react';
import { tmdbImage } from './api';

const Thumbnail = (props) => {
    const { name, path } = props;

    useEffect(async () => {
        try {
            const response = await tmdbImage.get(`/w92${path}`);
            console.log(response);
            
            return () => {
                tmdbImage.CancelToken.source().cancel();
            }
        } catch (error) { 
            console.error(error);
        }
    }, [])

    return(
        <img alt={name} src={`https://image.tmdb.org/t/p/w92${path}`}/>
    )
}

export default Thumbnail;