import React from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';

import './ShowList.css';

const ShowList = (props) => {
    const { data } = props;
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const posterSize = 'w185';

    return (
        <div className="list-container">
            {data.map(item => {
                console.log(item);
                const releaseYear = item.release_date.split('-')[0];
                const posterPath = `${baseUrl}${posterSize}${item.poster_path}`;

                return (
                    <>
                        {/* <span>{item.title} </span> */}
                        {/* <span>{releaseYear}</span> */}
                        {/* {item.poster_path && <img alt={item.title} src={posterPath}/>} */}
                        <Thumbnail name={item.title} imgSrc={posterPath} releaseYear={releaseYear} starRate={item.vote_average} />
                    </>
                )
            })}
        </div>
    )
}

export default ShowList;