import React, { useState, useEffect } from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import DotButtons from './DotButtons';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

import './Carousel.css';

const Carousel = (props) => {
    const { displayList, activeIndex, setActiveIndex } = props;
    const [auto, setAuto] = useState(true);
    const length = displayList.length;
    console.log('displayList: ', displayList, 'activeIndex: ', activeIndex, 'displayList at activeIndex: ', displayList[activeIndex]);

    useEffect(() => {
        setTimeout(() => {
            setAuto(false);
        }, 25000)
    }, [])

    useEffect(() => {
        if (auto && length) {
            setTimeout(() => {
                // let index = activeIndex ? activeIndex : 0;
                // let nextIndex = (activeIndex + 1) % length;
                // let nextIndex = activeIndex === length - 1 ? 0 : activeIndex + 1;
                // console.log('length: ', length, 'nextIndex: ', nextIndex);

                setActiveIndex(nextIndex());
            }, 5000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auto, length, activeIndex])

    const prevIndex = () => {
        return activeIndex === 0 ? length - 1 : activeIndex - 1;
    }

    const nextIndex = () => {
        // return activeIndex === length - 1 ? 0 : activeIndex + 1;
        console.log('nextIndex: ', (activeIndex + 1) % length);
        
        return (activeIndex + 1) % length;
    }

    const goToPrevSlide = () => {
        setAuto(false);
        setActiveIndex(prevIndex());
    }

    const goToNextSlide = () => {
        setAuto(false);
        setActiveIndex(nextIndex());
    }

    const goToSlide = (index) => {
        setAuto(false);
        setActiveIndex(index);
    }

    const leftImgSrc = () => {
        return displayList[prevIndex()].img_src;
    }

    const rightImgSrc = () => {
        return displayList[nextIndex()].img_src;
    }

    return (
        <>
            {length ?
                <div className="carousel">
                    <div className="carousel_show_slide">
                        {/* <LeftArrow goToPrevSlide={goToPrevSlide} /> */}
                        <LeftArrow goToPrevSlide={goToPrevSlide} imgSrc={leftImgSrc()} />
                        {/* <img
                            className="carousel__img_home prev"
                            src={displayList[prevIndex()].img_src}
                            alt=""
                        /> */}
                        <img
                            className="carousel__img_home"
                            src={displayList[activeIndex].img_src}
                            alt={displayList[activeIndex].title}
                        />
                        {/* <img
                            className="carousel__img_home next"
                            src={displayList[nextIndex()].img_src}
                            alt=""
                        /> */}
                        <Link to={displayList[activeIndex].link_path} >
                            <h1 className="carousel__title_home">{displayList[activeIndex].title}</h1>
                        </Link>
                        <RightArrow goToNextSlide={goToNextSlide} imgSrc={rightImgSrc()} />
                        {/* <RightArrow goToNextSlide={goToNextSlide} /> */}
                    </div>
                    <DotButtons numOfButtons={length} goToSlide={goToSlide} activeIndex={activeIndex} />
                </div>
                : <Loader />}
        </>
    )
}

export default Carousel;