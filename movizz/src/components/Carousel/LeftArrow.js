import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const LeftArrow = (props) => {
    const { goToPrevSlide } = props;

    return (
        <button className='back_arrow' onClick={goToPrevSlide}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
    )
}

export default LeftArrow;