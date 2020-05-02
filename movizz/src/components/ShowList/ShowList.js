import React from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';
import { Link } from 'react-router-dom';
import { tmdbImage } from '../../api';

import './ShowList.css';

const ShowList = (props) => {
    const { data } = props;
    const posterSize = 'w185';

    const listItems = data.map(item => {
        const releaseYear = item.release_date ? item.release_date.split('-')[0] : null;
        const posterPath = `${tmdbImage}${posterSize}${item.poster_path}`;
        const title = item.title.length < 21 ? item.title : item.title.substring(0, 18) + '...';
        const listItem = <Thumbnail name={title} imgSrc={posterPath} releaseYear={releaseYear} starRate={item.vote_average} key={item.id} />;
        return (
            <Link to={`/movie/${item.id}`} key={item.id}>{listItem}</Link>
        );
    });

    return (
        <div className="list-container">
            {listItems}
        </div>
    )
}

export default ShowList;