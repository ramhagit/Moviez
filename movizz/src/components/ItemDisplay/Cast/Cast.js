import React, { useEffect, useState } from 'react';
import { TMDBAPI } from '../../../api/base';
import { tmdbKey } from '../../../keys';
import { tmdbImage } from '../../../api/base';
import Carousel from '../../Carousel/Carousel';

const Cast = (props) => {
    const { castList, movieId } = props;
    const [casrArr, setCasrArr] = useState([]);
    const [crewArr, setCrewArr] = useState([]);

    useEffect(() => {
        const tmdbMovieCredits = () => {
            try {
                TMDBAPI.get(`movie/${movieId}/credits?api_key=${tmdbKey}`)
                    .then(response => {
                        console.log('Credits: ', response.data);
                        setCasrArr(response.data.cast);
                        setCrewArr(response.data.crew);
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
                    title: castMember.name,
                    year: castMember.character,
                    rate: castMember.vote_average,
                    img_src: `${tmdbImage}original${castMember.profile_path}`,
                    link_path: `/person/${castMember.id}`
                }
            )
        })
    }

    return (
        <>
            {castList.props.children && <div>Cast: {castList}</div>}
            <Carousel displayList={makeCastListForCarousel(casrArr).slice(0,5)} displayType="cover"/>
        </>
    )
}

export default Cast;