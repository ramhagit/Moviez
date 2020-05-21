import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWidth from '../../../hooks/useWidth';

import './Pagination.css';

const Pagination = (props) => {
    const { numOfPages, path } = props;

    const [indexOfFirstToDisplayPage, setIndexOfFirstToDisplayPage] = useState(0);
    const [amountOfDisplayedPages, setAmountOfDisplayedPages] = useState(5);
    const [backwardsDisabled, setBackwardsDisabled] = useState(true);
    const [forwardsDisabled, setForwardsDisabled] = useState(false);

    const currentPage = Number(window.location.href.split('page/')[1]);
    const prevDisabled = !currentPage ? true : currentPage === 1 ? true : false;
    const nextDisabled = !currentPage ? true : currentPage === numOfPages ? true : false;
    const width = useWidth();
    // console.log('path: ', path, 'current url: ', window.location.href);


    useEffect(() => {
        width < 450 ? setAmountOfDisplayedPages(4) :
            width < 540 ? setAmountOfDisplayedPages(5) :
                width < 660 ? setAmountOfDisplayedPages(7) :
                    width < 850 ? setAmountOfDisplayedPages(10) :
                        width < 1050 ? setAmountOfDisplayedPages(15) :
                            setAmountOfDisplayedPages(20);
    }, [width])

    useEffect(() => {
        if (indexOfFirstToDisplayPage > numOfPages) {
            setIndexOfFirstToDisplayPage(currentPage - 1);
        }
        if (currentPage > indexOfFirstToDisplayPage + amountOfDisplayedPages || currentPage < indexOfFirstToDisplayPage + 1) {
            setIndexOfFirstToDisplayPage(currentPage - 1);
        }

        if (indexOfFirstToDisplayPage >= numOfPages - amountOfDisplayedPages - 1) {
            setForwardsDisabled(true);
        }
        if (indexOfFirstToDisplayPage + amountOfDisplayedPages - 1 < numOfPages - 1) {
            setBackwardsDisabled(true);
        }
        if (indexOfFirstToDisplayPage !== 0) {
            setBackwardsDisabled(false);
        }
    }, [currentPage, indexOfFirstToDisplayPage, numOfPages, amountOfDisplayedPages])

    const firstDisabled = indexOfFirstToDisplayPage < amountOfDisplayedPages ? true : false;
    const lastDisabled = indexOfFirstToDisplayPage + 1 >= numOfPages - amountOfDisplayedPages ? true : false;
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
            ><u>First</u></button>
        </Link>
        <Link to={`${path}/page/${currentPage - 1}`}>
            <button
                className="pagination-arrow prev"
                disabled={prevDisabled}
            >&lt;P</button>
        </Link>
        {/* <button className="pagination-arrow backward" disabled={backwardsDisabled}><b>&lt;</b></button> */}
        <div className="pages-bar">
            {pages.slice(indexOfFirstToDisplayPage, indexOfFirstToDisplayPage + amountOfDisplayedPages)}
        </div>
        {/* <button className="pagination-arrow forward" disabled={forwardsDisabled}><b>&gt;</b></button> */}
        <Link to={`${path}/page/${currentPage + 1}`}>
            <button
                className="pagination-arrow next"
                disabled={nextDisabled}
            >N&gt;</button>
        </Link>
        <Link to={`${path}/page/${numOfPages}`}>
            <button
                className="pagination-arrow last"
                onClick={() => { setIndexOfFirstToDisplayPage(numOfPages - amountOfDisplayedPages) }}
                disabled={lastDisabled}
            ><u>Last</u></button>
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