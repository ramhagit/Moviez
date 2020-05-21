import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const LeftArrow = (props) => {
    const { goToPrevSlide, goToPrevPack, imgSrc, mobile, auto, stopAutoSlideShift, displayType } = props;

    const backgroundImgStyle = {
        backgroundImage: `linear-gradient(rgba(218, 218, 194, 0.5), rgba(218, 218, 194, 0.5)), url('${imgSrc}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
        backgroundSize: 'cover'
    }

    return (
        <button
            className={`${displayType === "packs" || mobile ? 'arrow_back' : 'back_arrow'} ${displayType} ${auto ? 'auto' : ''}`}
            onClick={displayType === "cover" ? goToPrevSlide : displayType === "packs" ? goToPrevPack : null}
            style={displayType === "cover" && !mobile ? backgroundImgStyle : {}}
            onMouseEnter={stopAutoSlideShift}
        >
            <button>
                <FontAwesomeIcon icon={faAngleLeft} />
                {displayType === "cover" && !mobile && ' Previous'}
            </button>
        </button>
    )
}

export default LeftArrow;