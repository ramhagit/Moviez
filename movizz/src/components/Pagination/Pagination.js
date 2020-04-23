import React from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = (props) => {
    const { numOfPages } = props;
    console.log(props);


    const pages = Array.from(new Array(numOfPages), (x, i) => i + 1).map(page => {
        const pageButton = <button onClick={e => console.log(e.target.value)} className="page" key={page}>{page}</button>
        return (
            <Link to={`/page/${page}`}>{pageButton}</Link>
        )
    });

    return (
        <>
            {numOfPages > 1 ? <div className="pages-bar">{pages}</div> : null}
        </>
    )
}

export default Pagination;