import React, { useState, useEffect } from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import DotButtons from './DotButtons';
import { Link } from 'react-router-dom';
import Loader from '../../Loader';

import './Carousel.css';

const Carousel = (props) => {
    const { displayList, activeIndex, setActiveIndex } = props;
    const [auto, setAuto] = useState(true);
    const length = displayList.length;
    console.log('displayList: ', displayList, 'activeIndex: ', activeIndex, 'displayList at activeIndex: ', displayList[activeIndex]);

    useEffect(() => {
        if (auto && length) {
            setTimeout(() => {
                // let index = activeIndex ? activeIndex : 0;
                // let nextIndex = (activeIndex + 1) % length;
                let nextIndex = activeIndex === length - 1 ? 0 : activeIndex + 1;
                console.log('length: ', length, 'nextIndex: ', nextIndex);

                setActiveIndex(nextIndex);
            }, 5000)
        }
    }, [auto, length, activeIndex])

    const goToPrevSlide = () => {
        setAuto(false);
        let index = activeIndex;
        index < 1 ? index = length - 1 : index--;
        setActiveIndex(index);
    }

    const goToNextSlide = () => {
        setAuto(false);
        let index = activeIndex;
        index === length - 1 ? index = 0 : index++;
        setActiveIndex(index);
    }

    const goToSlide = (index) => {
        setAuto(false);
        setActiveIndex(index);
    }

    const leftImgSrc = () => {
        return !activeIndex ? displayList[length - 1].img_src : displayList[activeIndex - 1].img_src;
    }

    const rightImgSrc = () => {
        console.log('activeIndex: ', activeIndex);
        
        return activeIndex === length - 1 ?
            displayList[0].img_src :
            displayList[activeIndex + 1].img_src;
    }

    return (
        <>
            {length ?
                <div className="carousel">
                    <div className="carousel_show_slide">
                        <LeftArrow goToPrevSlide={goToPrevSlide} />
                        {/* <LeftArrow goToPrevSlide={goToPrevSlide} imgSrc={leftImgSrc()} /> */}
                        <img
                            className="carousel__img_home"
                            src={displayList[activeIndex].img_src}
                            alt={displayList[activeIndex].title}
                        />
                        <Link to={displayList[activeIndex].link_path} >
                            <h1 className="carousel__title_home">{displayList[activeIndex].title}</h1>
                        </Link>
                        {/* <RightArrow goToNextSlide={goToNextSlide} imgSrc={rightImgSrc()} /> */}
                        <RightArrow goToNextSlide={goToNextSlide} />
                    </div>
                    <DotButtons numOfButtons={length} goToSlide={goToSlide} activeIndex={activeIndex} />
                </div>
                : <Loader />}
        </>
    )
}

export default Carousel;