import React from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import DotButtons from './DotButtons';

import './Carousel.css';

const Carousel = (props) => {
    const { displayList, activeIndex, setActiveIndex } = props;
    const length = displayList.length;
    console.log('displayList: ', displayList, 'activeIndex: ', activeIndex, 'displayList at activeIndex: ', displayList[activeIndex]);

    const goToPrevSlide = () => {
        let index = activeIndex;
        index < 1 ? index = length - 1 : index--;
        setActiveIndex(index);
    }

    const goToNextSlide = () => {
        let index = activeIndex;
        index === length - 1 ? index = 0 : index++;
        setActiveIndex(index);
    }

    const goToSlide = (index) => {
        setActiveIndex(index);
    }

    return (
        <div className="carousel">
            <div className=""></div>
            {/* {displayList.map(item => {
                return <div className="home__cover">
                <h2>{item.title}</h2>
                <img src={item.img_src} />
                </div>
            })} */}
            {displayList.length ?
                <div className="carousel_show_slide">
                    <img className="carousel__img_home" src={displayList[activeIndex].img_src} alt={displayList[activeIndex].title} />
                    <h1 className="carousel__title_home">{displayList[activeIndex].title}</h1>
                </div>
                : null}
            <LeftArrow goToPrevSlide={goToPrevSlide} />
            <RightArrow goToNextSlide={goToNextSlide} />
            <DotButtons numOfButtons={length} goToSlide={goToSlide} activeIndex={activeIndex} />
        </div>
    )
}

export default Carousel;