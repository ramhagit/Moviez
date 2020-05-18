import React from 'react';
import ReactPlayer from 'react-player';

const Trailer = (props) => {
    const { trailerURL } = props;

    const trailerStyle = {
        maxHeight: '390px'
    };

    return (
        <ReactPlayer url={trailerURL} width='100%' height={trailerURL ? '36vw' : 0} style={trailerStyle} />
    )
}

export default Trailer;