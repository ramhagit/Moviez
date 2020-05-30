import React, { useState, useEffect } from 'react';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import DotButtons from './DotButtons';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import useWidth from '../../hooks/useWidth';

import './Carousel.css';

const Carousel = (props) => {
    const { displayList, displayType } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [activePack, setActivePack] = useState(0);
    const [indexOfPackStart, setIndexOfPackStart] = useState(0);
    const [packSize, setPackSize] = useState(1);
    const [numOfPacks, setNumOfPacks] = useState(Math.ceil(displayList.length / packSize));
    const [slideShift, setSlideShift] = useState(null);
    const [auto, setAuto] = useState(true);
    const [mobile, setMobile] = useState(false);
    const width = useWidth();
    const length = displayList.length;
    console.log('displayList: ', displayList, 'activeIndex: ', activeIndex, 'displayList at activeIndex: ', displayList[activeIndex]);

    useEffect(() => {
        timeOutAuto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setNumOfPacks(Math.ceil(displayList.length / packSize));
    }, [displayList, packSize])

    useEffect(() => {
        setIndexOfPackStart(activePack * packSize);
    }, [activePack, packSize])

    useEffect(() => {
        if (width > 750) {
            setPackSize(5)
        } else if (width > 640) {
            setPackSize(4);
        } else if (width > 330) {
            setPackSize(3);
        } else {
            setPackSize(2);
        }

        if (width < 450) {
            setMobile(true);
        }
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
        setActiveIndex(prevIndex());
    }

    const goToNextSlide = () => {
        setActiveIndex(nextIndex());
    }

    const goToSlide = (index) => {
        setActiveIndex(index);
    }

    const prevPack = () => {
        return activePack === 0 ? numOfPacks - 1 : activePack - 1;
    }

    const nextPack = () => {
        return (activePack + 1) % numOfPacks;
    }

    const goToPrevPack = () => {
        setActivePack(prevPack());
    }

    const goToNextPack = () => {
        setActivePack(nextPack());
    }

    const goToPack = (num) => {
        setActivePack(num);
    }

    const leftImgSrc = () => {
        return displayList[prevIndex()].img_src;
    }

    const rightImgSrc = () => {
        return displayList[nextIndex()].img_src;
    }

    const CoverDisplay = () => {
        return (
            <>
                <div className={`carousel__slide_cover ${auto ? 'auto' : ''}`}>
                    <img
                        className="carousel__img_cover"
                        src={displayList[activeIndex].img_src}
                        alt={displayList[activeIndex].title}
                        onMouseDown={() => { setAuto(true); timeOutAuto() }}
                    />
                    <Link to={displayList[activeIndex].link_path} >
                        <div className={`carousel__title_cover ${auto ? 'auto' : ''}`}>
                            <h1>{displayList[activeIndex].title}</h1>
                            <h2>{displayList[activeIndex].year}</h2>
                        </div>
                    </Link>
                    <div className={`carousel__rate_cover ${auto ? 'auto' : ''}`}>
                        {displayList[activeIndex].rate}
                    </div>
                </div>
            </>
        )
    }

    const PacksDisplay = () => {
        const cards = displayList.map(item => {
            return <div className="carousel__card">
                <Link to={item.link_path} >
                    <div className="carousel__card_img_container">
                        <img className="carousel__card_img" src={item.img_src} alt="" />
                    </div>
                    <div className="carousel__card_description">
                        <div className="carousel__card_description_name">{item.name}</div>
                        <div className="carousel__card_description_character">{item.character}</div>
                    </div>
                </Link>
            </div>
        })

        return (
            <div className={`carousel__slide_packs ${auto ? 'auto' : ''}`}>
                {cards.slice(indexOfPackStart, indexOfPackStart + packSize)}
            </div>
        )
    }

    return (
        <>
            {length ?
                <div className={`carousel ${displayType}`}>
                    <div className={`carousel_show_slide ${displayType}`} onMouseEnter={stopAutoSlideShift}>
                        <LeftArrow
                            goToPrevSlide={goToPrevSlide}
                            goToPrevPack={goToPrevPack}
                            imgSrc={leftImgSrc()}
                            mobile={mobile}
                            auto={auto}
                            stopAutoSlideShift={stopAutoSlideShift}
                            displayType={displayType}
                        />
                        {displayType === "cover" && <CoverDisplay />}
                        {displayType === "packs" && <PacksDisplay />}
                        <RightArrow
                            goToNextSlide={goToNextSlide}
                            goToNextPack={goToNextPack}
                            imgSrc={rightImgSrc()}
                            mobile={mobile}
                            auto={auto}
                            stopAutoSlideShift={stopAutoSlideShift}
                            displayType={displayType}
                        />
                    </div>
                    {displayType === "packs" && <DotButtons
                        numOfButtons={numOfPacks}
                        goTo={goToPack}
                        activeIndex={activePack}
                        stopAutoSlideShift={stopAutoSlideShift}
                        displayType={displayType}
                    />}
                    {displayType === "cover" && <DotButtons
                        numOfButtons={length}
                        goTo={goToSlide}
                        activeIndex={activeIndex}
                        stopAutoSlideShift={stopAutoSlideShift}
                        displayType={displayType}
                    />}
                </div>
                : <Loader />}
        </>
    )
}

Carousel.defaultProps = {
    displayType: "cover"
}

export default Carousel;