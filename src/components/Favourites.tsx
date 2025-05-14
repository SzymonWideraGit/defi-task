import React, { FC, useRef, useState, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { colors } from "../styleHelpers/colors";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SingleFavouriteCard } from "./common/SingleFavouriteCard";
import { useAppSelector } from "../hooks/reduxHooks";
import Typography from "@mui/material/Typography";

const CarouselWrapper = styled.div`
    width: 100%;
    overflow: hidden;
    touch-action: pan-y;
`;

const CarouselTrack = styled.div<{ translateX: number }>`
    display: flex;
    transition: transform 0.4s ease;
    ${props => props.translateX > 0 ? css`
        transform: translateX(-${props.translateX}px);
    ` : css`
        transform: translateX(${-props.translateX}px);
    `};
    margin-bottom: 1rem;
`;

const SlideContainer = styled.div<{ cardMargin: number }>`
    flex: 0 0 auto;
    margin: ${({ cardMargin }) => `0 ${cardMargin}px`};
    overflow: hidden;
`;

const Title = styled(Typography)({
    color: colors.white,
    textAlign: 'center',
});

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 5%;
    color: ${colors.white};
`;

export const Favourites: FC = () => {
    const data = useAppSelector(state => state.cryptoData);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [slideWidth, setSlideWidth] = useState<number>(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const cardMargin = 12;
    const offsetToCenter = slideWidth * currentIndex - (containerWidth - slideWidth) / 2;
    const favouriteData = useMemo(() => data.filter(elem => elem.isFavourite), [data]);

    useEffect(() => {
        const updateSizes = () => {
            if (slideRef.current && containerRef.current) {
                const widthOFslide = slideRef.current.getBoundingClientRect().width + cardMargin * 2;
                const containerW = containerRef.current.getBoundingClientRect().width;
                setSlideWidth(widthOFslide);
                setContainerWidth(containerW);
            }
        };
        updateSizes();
        window.addEventListener("resize", updateSizes);
        return () => window.removeEventListener("resize", updateSizes);
    }, [favouriteData]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % favouriteData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + favouriteData?.length) % favouriteData?.length);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const onTouchEnd = () => {
        if (touchStartX === null || touchEndX === null) {
            return;
        } 
        const distance = touchStartX - touchEndX;
        const threshold = 50;
        if (distance > threshold) {
            handleNext();
        }
        else if (distance < -threshold) {
            handlePrev();
        }
        setTouchStartX(null);
        setTouchEndX(null);
    };

    return (
        <CarouselWrapper
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {favouriteData?.length > 0 ? (
                <>
                    <Title sx={{fontSize: {sm: "87px", xs: "39px"}, marginBottom: "20px", marginTop: "10px"}}>My cryptocurrencies</Title>
                    <CarouselTrack translateX={offsetToCenter}>
                        {favouriteData?.map((elem, index) => 
                            <SlideContainer
                                key={index}
                                ref={index === 0 ? slideRef : null}
                                cardMargin={cardMargin}
                            >
                                <SingleFavouriteCard
                                    key={elem.id}
                                    {...elem}
                                    active={index === currentIndex}
                                />
                            </SlideContainer>)}
                        </CarouselTrack>
                    <ButtonsContainer>
                        <ArrowBackIcon sx={{minWidth: "64px", height: "auto"}} onClick={handlePrev} />
                        <ArrowForwardIcon sx={{minWidth: "64px", height: "auto"}} onClick={handleNext} />
                    </ButtonsContainer>
                </>
            ) : <Title sx={{fontSize: {sm: "87px", xs: "39px"}, marginBottom: "20px", marginTop: "10px"}}>You dont have favourite cryptos</Title>}
        </CarouselWrapper>
    );
};
