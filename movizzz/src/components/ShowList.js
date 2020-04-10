import React from 'react';


const ShowList = (props) => {
    const { data } = props;
    return (
        <>
            <h1>movies: </h1>
            {data.map(item => {
                return (
                    <div>
                        <span>{item.title} </span>
                        <span>{item.release_date.split('-')[0]}</span>
                    </div>
                )
            })}
        </>
    )
}

export default ShowList;