import React, { useState, useEffect } from 'react';
import { TMDBAPI } from '../../api';
import { tmdbKey } from '../../keys';
import Pagination from '../Pagination/Pagination';
import ShowList from '../ShowList/ShowList';
import Loader from '../../Loader';

import './Home.css';

const Home = (props) => {
    const { pageNum } = props;
    const [data, setData] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);
    // const [path, setPath] = useState("");

    const releaseDateLimit = () => {
        const nowDate = new Date();
        const mm = nowDate.getMonth();
        const dd = nowDate.getDate();
        return `${nowDate.getFullYear()}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;
    }

    useEffect(() => {
        const fetchData = () => {
            setData([]);
            try {
                TMDBAPI.get(`discover/movie?api_key=${tmdbKey}&language=en-US&region=US&sort_by=release_date.desc&release_date.lte=${releaseDateLimit()}&vote_average.gte=5.5&page=${pageNum}`
                ).then(response => {
                    setData(response.data.results);
                    setNumOfPages(response.data.total_pages);
                });

                return () => {
                    TMDBAPI.CancelToken.source().cancel();
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [pageNum])

    return (
        <div className="home-container">
            <Pagination numOfPages={numOfPages} path={""} />
            <div className="welcome">Welcome to MovizZ</div>
            {data.length ? <ShowList data={data} /> : <Loader />}
        </div>
    );
}

Home.defaultProps = {
    pageNum: 1
}

export default Home;