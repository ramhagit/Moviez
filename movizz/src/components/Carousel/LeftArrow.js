import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const LeftArrow = (props) => {
    const { goToPrevSlide, imgSrc } = props;

    const backgroundImgStyle = {
        backgroundImage: `linear-gradient(rgba(218, 218, 194, 0.5), rgba(218, 218, 194, 0.5)), url('${imgSrc}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
        backgroundSize: 'cover'
    }

    return (
        <button
            className={imgSrc ? 'back_arrow' : 'arrow_back'}
            onClick={goToPrevSlide}
            style={imgSrc ? backgroundImgStyle : {}}
        >
            <span>
                <FontAwesomeIcon icon={faAngleLeft} />
                {imgSrc && ' Previous'}
            </span>
        </button>
    )
}

export default LeftArrow;