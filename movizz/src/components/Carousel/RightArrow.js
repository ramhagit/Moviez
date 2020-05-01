import React from 'react';

const RightArrow = (props) => {
    const { goToNextSlide } = props;

    return (
        <button className='forward_arrow' onClick={goToNextSlide}>
            {/* <i className='fa fa-angle-left fa-3x' aria-hidden='true'></i> */}
            {'>'}
        </button>
    )
}

export default RightArrow;