import React from 'react';
import Thumbnail from './Thumbnail';


const ShowList = (props) => {
    const { data } = props;
    return (
        <>
            <h1>movies: </h1>
            {data.map(item => {
                console.log(item);
                
                return (
                    <div>
                        <span>{item.title} </span>
                        <span>{item.release_date.split('-')[0]}</span>
                        <img alt={item.title} src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}/>
                        {/* <Thumbnail name={item.title} path={item.poster_path} /> */}
                    </div>
                )
            })}
        </>
    )
}

export default ShowList;