import React from 'react';

const Cast = (props) => {
    const { castList } = props;
    
    const displayCast = castList !== "N/A" ? castList.split(',').map(item => {
        return <div key={item}>{item}</div>
    }) : '';

    return (
        <div>CastList: {displayCast}</div>
    )
}

export default Cast;