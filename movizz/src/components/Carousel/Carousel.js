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
        setTimeout(() => {
            setAuto(false);
        },25000) 
    }, [])
    
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
        let prevIndex = activeIndex === 0 ? length - 1 : activeIndex - 1; 
        return displayList[prevIndex].img_src;
    }

    const rightImgSrc = () => {
        let nextIndex = activeIndex === length - 1 ? 0 : activeIndex + 1; 
        console.log('activeIndex: ', activeIndex);
        
        return displayList[nextIndex].img_src;
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