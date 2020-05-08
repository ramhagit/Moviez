import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const RightArrow = (props) => {
    const { goToNextSlide, imgSrc } = props;

    const backgroundImgStyle = {
        backgroundImage: `url('${imgSrc}')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    }

    return (
        <button className='forward_arrow' onClick={goToNextSlide} style={backgroundImgStyle}>
            {/* <i className='fa fa-angle-left fa-3x' aria-hidden='true'></i> */}
            <FontAwesomeIcon icon={faAngleRight} />
            {/* {'>'} */}
        </button>
    )
}

export default RightArrow;