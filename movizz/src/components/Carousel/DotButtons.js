import React from 'react';

const DotButtons = (props) => {
    const { numOfButtons, goToSlide } = props;

    const DotButton = (index) => {
        return <span className="dot-button" data-index={index} onClick={e => goToSlide(e.target.dataset.index)} key={index} ></span>
    }

    const dots = Array.from(new Array(numOfButtons), (x, i) => i).map(dot => {
        return DotButton(dot);
    });

    return (
        <div className="dot-buttons">{dots}</div>
    )
}

export default DotButtons;