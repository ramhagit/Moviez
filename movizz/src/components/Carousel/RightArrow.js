import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const RightArrow = (props) => {
    const { goToNextSlide, imgSrc, auto, stopAutoSlideShift } = props;

    const backgroundImgStyle = {
        backgroundImage: `linear-gradient(rgba(218, 218, 194, 0.5), rgba(218, 218, 194, 0.5)), url('${imgSrc}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundSize: 'cover'
    }

    return (
        <button
            className={`${imgSrc ? 'forward_arrow' : 'arrow_forward'} ${auto ? 'auto' : ''}`}
            onClick={goToNextSlide}
            style={imgSrc ? backgroundImgStyle : {}}
            onMouseEnter={stopAutoSlideShift}
        >
            <span>
                {imgSrc && 'Next '}
                <FontAwesomeIcon icon={faAngleRight} />
            </span>
        </button>
    )
}

export default RightArrow;