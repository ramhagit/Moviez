import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const LeftArrow = (props) => {
    const { goToPrevSlide, imgSrc } = props;

    const backgroundImgStyle = {
        backgroundImage: `url('${imgSrc}')`,
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed',
        // backgroundSize: 'cover'
    }

    return (
        <button className='back_arrow' onClick={goToPrevSlide} style={backgroundImgStyle}>
            <FontAwesomeIcon icon={faAngleLeft} />
            {/* {'<'} */}
        </button>
    )
}

export default LeftArrow;