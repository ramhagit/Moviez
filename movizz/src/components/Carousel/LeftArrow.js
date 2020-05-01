import React from 'react';

const LeftArrow = (props) => {
    const { goToPrevSlide } = props;

    return (
        <button className='back_arrow' onClick={goToPrevSlide}>
            {'<'}
        </button>
    )
}

export default LeftArrow;