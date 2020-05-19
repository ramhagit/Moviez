import React, { useState, useEffect } from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import DotButtons from './DotButtons';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import useWidth from '../../hooks/useWidth';

import './Carousel.css';

const Carousel = (props) => {
    const { displayList, activeIndex, setActiveIndex } = props;
    const [auto, setAuto] = useState(true);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [slideShift, setSlideShift] = useState(null);
    const length = displayList.length;
    const width = useWidth();
    console.log('displayList: ', displayList, 'activeIndex: ', activeIndex, 'displayList at activeIndex: ', displayList[activeIndex]);

    useEffect(() => {
        timeOutAuto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        width < 450 ? setMobile(true) : setMobile(false);
    }, [width])

    useEffect(() => {
        if (auto && length) {
            setSlideShift(setTimeout(() => {
                setActiveIndex(nextIndex());
            }, 5000))
        }
        return () => {
            clearTimeout(slideShift);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auto, length, activeIndex])

    const timeOutAuto = () => {
        setTimeout(() => {
            setButtonDisable(false);
            stopAutoSlideShift();
        }, 25000)
    }

    const stopAutoSlideShift = () => {
        setAuto(false);
        clearTimeout(slideShift);
    }

    const prevIndex = () => {
        return activeIndex === 0 ? length - 1 : activeIndex - 1;
    }

    const nextIndex = () => {
        return (activeIndex + 1) % length;
    }

    const goToPrevSlide = () => {
        // stopAutoSlideShift();
        setActiveIndex(prevIndex());
    }

    const goToNextSlide = () => {
        // stopAutoSlideShift();
        setActiveIndex(nextIndex());
    }

    const goToSlide = (index) => {
        // stopAutoSlideShift();
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
                    <div className="carousel_show_slide" onMouseEnter={stopAutoSlideShift}>
                        {mobile && <LeftArrow
                            goToPrevSlide={goToPrevSlide}
                            auto={auto}
                            stopAutoSlideShift={stopAutoSlideShift}
                        />}
                        {!mobile && <LeftArrow
                            goToPrevSlide={goToPrevSlide}
                            imgSrc={leftImgSrc()}
                            auto={auto}
                            stopAutoSlideShift={stopAutoSlideShift}
                        />}
                        <img
                            className={`carousel__img_home ${auto ? 'auto' : ''}`}
                            src={displayList[activeIndex].img_src}
                            alt={displayList[activeIndex].title}
                            onMouseDown={() => { setAuto(true); timeOutAuto() }}
                        />
                        <Link to={displayList[activeIndex].link_path} >
                            <div className={`carousel__title_home ${auto ? 'auto' : ''}`}>
                                <h1>{displayList[activeIndex].title}</h1>
                                <h2>{displayList[activeIndex].year}</h2>
                            </div>
                        </Link>
                        <div className={`carousel__rate_home ${auto ? 'auto' : ''}`}>
                            {displayList[activeIndex].rate}
                        </div>
                        {!mobile && <RightArrow
                            goToNextSlide={goToNextSlide}
                            imgSrc={rightImgSrc()}
                            auto={auto}
                            stopAutoSlideShift={stopAutoSlideShift}
                        />}
                        {mobile && <RightArrow
                            goToNextSlide={goToNextSlide}
                            auto={auto}
                            stopAutoSlideShift={stopAutoSlideShift}
                        />}
                    </div>
                    <DotButtons
                        numOfButtons={length}
                        goToSlide={goToSlide}
                        activeIndex={activeIndex}
                        stopAutoSlideShift={stopAutoSlideShift}
                    />
                </div>
                : <Loader />}
        </>
    )
}

export default Carousel;