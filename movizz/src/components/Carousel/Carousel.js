import React, { useState, useEffect } from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

const Carousel = (props) => {
    const { displayList, activeIndex, setActiveIndex } = props;
    const length = displayList.length;
    console.log('displayList: ', displayList, 'activeIndex: ', activeIndex, 'displayList at activeIndex: ', displayList[activeIndex]);

    const goToPrevSlide = () => {
        let index = activeIndex;

        if (index < 1) {
            index = length - 1;
        }
        else {
            index--;
        }
        setActiveIndex(index);
    }

    const goToNextSlide = () => {
        let index = activeIndex;

        if (index === length - 1) {
            index = 0
        }
        else {
            index++;
        }
        setActiveIndex(index);
    }


    return (
        <div className="carousel">
            <LeftArrow goToPrevSlide={goToPrevSlide} />
            {/* {displayList.map(item => {
                return <div className="home__cover">
                    <h2>{item.title}</h2>
                    <img src={item.img_src} />
                </div>
            })} */}
            {displayList.length ?
                <div className="carousel_show_slide">
                    <h2>{displayList[activeIndex].title}</h2>
                    <img src={displayList[activeIndex].img_src} />
                </div>
                : null}
            <RightArrow goToNextSlide={goToNextSlide} />
        </div>
    )
}

export default Carousel;