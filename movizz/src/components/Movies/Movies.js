import React from 'react';
import Pagination from '../Pagination/Pagination';

const Movies = (props) => {
    console.log(props);
    
    return (
        <div>
            <Pagination numOfPages={5} path={props.match.path}/>
        </div>
    )
}

export default Movies;