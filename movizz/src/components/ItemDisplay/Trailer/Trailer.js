import React from 'react';
import ReactPlayer from 'react-player';

const Trailer = (props) => {
    const { trailersURL } = props;

    const trailerStyle = {
        maxHeight: '390px'
    };

    return (
        <ReactPlayer url={trailersURL[0]} width='100%' height={trailersURL[0] ? '36vw' : 0} style={trailerStyle} />
    )
}

export default Trailer;