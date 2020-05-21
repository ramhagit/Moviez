import React, { useEffect, useState } from 'react';
import { TMDBAPI } from '../../../api/base';
import { tmdbKey } from '../../../keys';
import { tmdbImage } from '../../../api/base';
import Carousel from '../../Carousel/Carousel';

const Cast = (props) => {
    const { movieId } = props;
    const [casrArr, setCasrArr] = useState([]);
    // const [crewArr, setCrewArr] = useState([]);

    useEffect(() => {
        const tmdbMovieCredits = () => {
            try {
                TMDBAPI.get(`movie/${movieId}/credits?api_key=${tmdbKey}`)
                    .then(response => {
                        console.log('Credits: ', response.data);
                        setCasrArr(response.data.cast);
                        // setCrewArr(response.data.crew);
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

    const makeCastListForCarousel = (arrOfItems) => {
        return arrOfItems.map(castMember => {
            return (
                {
                    name: castMember.name,
                    character: castMember.character,
                    img_src: `${tmdbImage}original${castMember.profile_path}`,
                    link_path: `/person/${castMember.id}`,
                    id: castMember.id
                }
            )
        })
    }

    return (
            <Carousel displayList={makeCastListForCarousel(casrArr)} displayType="packs"/>
    )
}

export default Cast;