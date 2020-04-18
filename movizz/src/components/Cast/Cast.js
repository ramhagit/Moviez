import React from 'react';

const Cast = (props) => {
    const { castList } = props;
    
    const displayCast = castList !== "N/A" ? castList.split(',').map(item => {
        return <div key={item}>{item}</div>
    }) : '';

    return (
        <div>Cast: {displayCast}</div>
    )
}

export default Cast;