import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const LeftArrow = (props) => {
    const { goToPrevSlide, imgSrc } = props;

    return (
        <button className='back_arrow' onClick={goToPrevSlide} style={{backgroundImage: `url('${imgSrc}')`}}>
            <FontAwesomeIcon icon={faAngleLeft} />
            {/* {'<'} */}
        </button>
    )
}

export default LeftArrow;