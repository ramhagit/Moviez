import React, { useEffect } from 'react';
import { TMDBAPI } from '../../../api/base';
import { tmdbKey } from '../../../keys';

const Cast = (props) => {
    const { castList, movieId } = props;
    
    // const displayCast = castList !== "N/A" ? castList.split(',').map(item => {
    //     return <div key={item}>{item}</div>
    // }) : '';

    useEffect(() => {
        const tmdbMovieCredits = () => {
            try {
                TMDBAPI.get(`movie/${movieId}/credits?api_key=${tmdbKey}`)
                    .then(response => {
                        console.log('Credits: ', response.data);
                    });

                return () => {
                    TMDBAPI.CancelToken.source().cancel();
                }

            } catch (error) {
                console.error(error);
            }
        }
        tmdbMovieCredits();
    }, [movieId])

    return (
        <>
            {castList.props.children && <div>Cast: {castList}</div>}
        </>
    )
}

export default Cast;