import React from 'react';
import ReactPlayer from 'react-player';

const Trailer = (props) => {
    const { trailerURL, trailerStyle } = props;
    return <>
        <ReactPlayer url={trailerURL} width='100%' height='36vw' style={trailerStyle} />
    </>
}

export default Trailer;