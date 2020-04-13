import React from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';

import './ShowList.css';

const ShowList = (props) => {
    const { data } = props;
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const posterSize = 'w185';

    const listItems = data.map(item => {
        const releaseYear = item.release_date.split('-')[0];
        const posterPath = `${baseUrl}${posterSize}${item.poster_path}`;
        return <Thumbnail name={item.title} imgSrc={posterPath} releaseYear={releaseYear} starRate={item.vote_average} key={item.id} />
    });

    return (
        <div className="list-container">
            {listItems}
        </div>
    )
}

export default ShowList;