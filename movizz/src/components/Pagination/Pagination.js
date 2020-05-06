import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = (props) => {
    const { numOfPages, path } = props;

    const [indexOfFirstToDisplayPage, setIndexOfFirstToDisplayPage] = useState(0);
    const [pagesDisplaySize, setPagesDisplaySize] = useState(5);
    const [backwardsDisabled, setBackwardsDisabled] = useState(true);
    const [forwardsDisabled, setForwardsDisabled] = useState(false);

    const currentPage = Number(window.location.href.split('page/')[1]);
    const prevDisabled = !currentPage ? true : currentPage === 1 ? true : false;
    const nextDisabled = !currentPage ? true : currentPage === numOfPages ? true : false;
    // console.log('path: ', path, 'current url: ', window.location.href);


    useEffect(() => {
        if (indexOfFirstToDisplayPage > numOfPages) {
            setIndexOfFirstToDisplayPage(currentPage - 1);
        }
        if (currentPage > indexOfFirstToDisplayPage + pagesDisplaySize || currentPage < indexOfFirstToDisplayPage + 1) {
            setIndexOfFirstToDisplayPage(currentPage - 1);
        }

        if (indexOfFirstToDisplayPage >= numOfPages - pagesDisplaySize - 1) {
            setForwardsDisabled(true);
        }
        if (indexOfFirstToDisplayPage + pagesDisplaySize - 1 < numOfPages - 1) {
            setBackwardsDisabled(true);
        }
        if (indexOfFirstToDisplayPage !== 0) {
            setBackwardsDisabled(false);
        }
    }, [currentPage, indexOfFirstToDisplayPage])

    const firstDisabled = indexOfFirstToDisplayPage < pagesDisplaySize ? true : false;
    const lastDisabled = indexOfFirstToDisplayPage + 1 >= numOfPages - pagesDisplaySize ? true : false;
    console.log('currentPage: ', currentPage, 'indexOfFirstToDisplayPage: ', indexOfFirstToDisplayPage, 'backwardsDisabled: ', backwardsDisabled, 'forwardsDisabled: ', forwardsDisabled);

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
        <Link to={`${path}/page/1`}>
            <button
                className="pagination-arrow first"
                onClick={() => { setIndexOfFirstToDisplayPage(0) }}
                disabled={firstDisabled}
            >{'First'}</button>
        </Link>
        <Link to={`${path}/page/${currentPage - 1}`}>
            <button
                className="pagination-arrow prev"
                disabled={prevDisabled}
            >{'<Prev'}</button>
        </Link>
        <button className="pagination-arrow backward" disabled={backwardsDisabled}>{'<'}</button>
        <div className="pages-bar">
            {pages.slice(indexOfFirstToDisplayPage, indexOfFirstToDisplayPage + pagesDisplaySize)}
        </div>
        <button className="pagination-arrow forward" disabled={forwardsDisabled}>{'>'}</button>
        <Link to={`${path}/page/${currentPage + 1}`}>
            <button
                className="pagination-arrow next"
                disabled={nextDisabled}
            >{'Next>'}</button>
        </Link>
        <Link to={`${path}/page/${numOfPages}`}>
            <button
                className="pagination-arrow last"
                onClick={() => { setIndexOfFirstToDisplayPage(numOfPages - pagesDisplaySize) }}
                disabled={lastDisabled}
            >{'Last'}</button>
        </Link>
    </div >

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