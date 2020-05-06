import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = (props) => {
    const { numOfPages, path } = props;
    const [activePageIndex, setActivePageIndex] = useState(0);
    // console.log('path: ', path, 'current url: ', window.location.href);
    const currentPage = Number(window.location.href.split('page/')[1]);

    const pages = Array.from(new Array(numOfPages), (x, i) => i + 1).map(page => {
        const pageButton = <button
            className={`page ${page === currentPage ? 'active' : ''}`}
            onClick={e => { console.log("target value: ", e.target.innerHTML) }}
            key={page}
        >{page}</button>
        return (
            <Link to={`${path}/page/${page}`} key={page}>{pageButton}</Link>
        )
    });

    const paginationNav = <div className="pagination-nav">
        <button className="pagination-arrow">{'First'}</button>
        <button className="pagination-arrow">{'<Prev'}</button>
        <button className="pagination-arrow">{'<'}</button>
        <div className="pages-bar">{pages}</div>
        <button className="pagination-arrow">{'>'}</button>
        <button className="pagination-arrow">{'Next>'}</button>
        <button className="pagination-arrow">{'Last'}</button>
    </div>

    return (
        <div className="pagination">
            {numOfPages > 1 ? paginationNav : null}
        </div>
    )
}

Pagination.defaultProps = {
    path: ''
}

export default Pagination;