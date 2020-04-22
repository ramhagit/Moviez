import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = (props) => {
    const { numOfPages, path } = props;
    console.log(props);


    const pages = Array.from(new Array(numOfPages), (x, i) => i + 1).map(page => {
        const pageButton = <button className="page" key={page}>{page}</button>
        return (
            // <></>
            <Link to={`${path}/page/${page}`}>{pageButton}</Link>
        )
    });
    // console.log(arr);

    return (
        <div className="pages-bar">{pages}</div>
    )
}

export default Pagination;