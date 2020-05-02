import React from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import DotButtons from './DotButtons';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';

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
        <>
            {displayList.length ?
                <div className="carousel">
                    <div className="carousel_show_slide">
                        <img
                            className="carousel__img_home"
                            src={displayList[activeIndex].img_src}
                            alt={displayList[activeIndex].title}
                        />
                        <Link to={displayList[activeIndex].link_path} >
                            <h1 className="carousel__title_home">{displayList[activeIndex].title}</h1>
                        </Link>
                    </div>
                    <LeftArrow goToPrevSlide={goToPrevSlide} />
                    <RightArrow goToNextSlide={goToNextSlide} />
                    <DotButtons numOfButtons={length} goToSlide={goToSlide} activeIndex={activeIndex} />
                </div>
                : <Loader />}
        </>
    )
}

export default Carousel;