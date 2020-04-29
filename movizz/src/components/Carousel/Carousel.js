import React, { useState, useEffect } from 'react';

const Carousel = (props) => {
    const { displayList } = props;

    return (
        <>{displayList}</>
    )
}

export default Carousel;