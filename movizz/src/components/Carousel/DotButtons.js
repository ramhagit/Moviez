import React from 'react';
import uniqid from "uniqid";

const DotButtons = (props) => {
    const { numOfButtons, goTo, activeIndex, stopAutoSlideShift } = props;

    const DotButton = (index) => {
        return <span
            className={`dot-button ${index === activeIndex ? 'active' : ''}`}
            onClick={() => { stopAutoSlideShift(); goTo(index) }}
            onMouseEnter={stopAutoSlideShift}
            key={uniqid()}
        ></span>
    }

    const dots = Array.from(new Array(numOfButtons), (x, i) => i).map(dot => {
        return DotButton(dot);
    });

    console.log('numOfButtons: ', numOfButtons, 'goTo: ', goTo, 'activeIndex: ', activeIndex);
    
    return (
        <div className="dot-buttons-container">
            <div className="dot-buttons">{dots}</div>
        </div>
    )
}

export default DotButtons;