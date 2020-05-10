import React from 'react';
import uniqid from "uniqid";

const DotButtons = (props) => {
    const { numOfButtons, goToSlide, activeIndex } = props;

    const DotButton = (index) => {
        return <span
            className={`dot-button ${index === activeIndex ? 'active' : ''}`}
            // data-index={index}
            // onClick={e => goToSlide(e.target.dataset.index)}
            onClick={() => goToSlide(index)}
            key={uniqid()}
        ></span>
    }

    const dots = Array.from(new Array(numOfButtons), (x, i) => i).map(dot => {
        return DotButton(dot);
    });

    return (
        <div className="dot-buttons-container">
            <div className="dot-buttons">{dots}</div>
        </div>
    )
}

export default DotButtons;