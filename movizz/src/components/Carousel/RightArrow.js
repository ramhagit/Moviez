import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const RightArrow = (props) => {
    const { goToNextSlide, goToNextPack, imgSrc, mobile, auto, stopAutoSlideShift, displayType } = props;

    const backgroundImgStyle = {
        backgroundImage: `linear-gradient(rgba(218, 218, 194, 0.5), rgba(218, 218, 194, 0.5)), url('${imgSrc}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundSize: 'cover'
    }

    return (
        <button
            className={`${displayType === "packs" || mobile ? 'arrow_forward' : 'forward_arrow'} ${displayType} ${auto ? 'auto' : ''}`}
            onClick={displayType === "cover" ? goToNextSlide : displayType === "packs" ? goToNextPack : null}
            style={displayType === "cover" && !mobile ? backgroundImgStyle : {}}
            onMouseEnter={stopAutoSlideShift}
        >
            <button>
                {displayType === "cover" && !mobile && 'Next '}
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </button>
    )
}

export default RightArrow;