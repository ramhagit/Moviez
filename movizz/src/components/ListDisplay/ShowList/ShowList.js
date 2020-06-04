import React from 'react';
import { Link } from 'react-router-dom';
import { tmdbImage } from '../../../api/base';
import Thumbnail from '../Thumbnail/Thumbnail';
import Pagination from '../Pagination/Pagination';
import useWidth from '../../../hooks/useWidth';

import './ShowList.css';

const ShowList = (props) => {
    const { data, numOfPages, path } = props;
    const width = useWidth();
    const posterSize = 'w185';

    const listItems = data.map(item => {
        const releaseYear = item.release_date ? item.release_date.split('-')[0] : '- - - -';
        const posterPath = `${tmdbImage}${posterSize}${item.poster_path}`;
        const title = item.title && item.title.length < 21 ? item.title : item.title ? item.title.substring(0, 18) + '...' : '';
        const listItem = <Thumbnail
            name={width < 450 && title.lenth > 11 ? title.substring(0, 10) + '...' : title}
            imgSrc={posterPath}
            releaseYear={releaseYear}
            starRate={item.vote_average}
            key={item.id}
        />;
        return (
            <Link to={`/movie/${item.id}`} key={item.id}>{listItem}</Link>
        );
    });

    return (
        <>
            <Pagination numOfPages={numOfPages} path={path} />
            <div className="list-container">
                {listItems}
            </div>
        </>
    )
}

ShowList.defaultProps = {
    numOfPages: 1
}

export default ShowList;