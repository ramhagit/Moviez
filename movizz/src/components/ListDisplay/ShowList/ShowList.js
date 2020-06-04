import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tmdbImage } from '../../../api/base';
import Thumbnail from '../Thumbnail/Thumbnail';
import Pagination from '../Pagination/Pagination';
import useWidth from '../../../hooks/useWidth';

import './ShowList.css';

const ShowList = (props) => {
    const { data, numOfPages, path } = props;
    const width = useWidth();
    const [mobile, setMobile] = useState(false);
    const posterSize = 'w185';

    useEffect(() => {
        width < 450 ? setMobile(true) : setMobile(false);
    }, [width])


    // const trimTitle = (str) => {
    //     if (str) {
    //         if (mobile) {
    //             return str.lenth > 11 ? str.substring(0, 10) + '...' : str;
    //         } else {
    //             return str.length < 21 ? str : str.substring(0, 18) + '...';
    //         }
    //     } else {
    //         return '';
    //     }
    // }

    const listItems = data.map(item => {
        const releaseYear = item.release_date ? item.release_date.split('-')[0] : '- - - -';
        const posterPath = `${tmdbImage}${posterSize}${item.poster_path}`;
        const title = item.title && item.title.length < 21 ? item.title : item.title ? item.title.substring(0, 18) + '...' : '';
        // const title = trimTitle(item.title);
        
        const listItem = <Thumbnail
            name={title}
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