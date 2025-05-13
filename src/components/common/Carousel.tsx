import React, { FC, useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { fontSizeAndHeight } from "../../styleHelpers/fontsSize";
import { colors } from "../../styleHelpers/colors";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IProps {
    children: React.ReactNode[];
    title: string;
    getCurrentIndex?(currentIndex: number): void
}

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

const SlideContainer = styled.div<{ active: boolean, cardMargin: number }>`
    flex: 0 0 auto;
    margin: ${({ cardMargin }) => `0 ${cardMargin}px`};
    transition: transform 0.7s ease;
    ${props => props.active ? css`
        transform: scale(1);
    ` : css`
        transform: scale(0.8);
    `};
    overflow: hidden;
`;

const Title = styled.div`
    ${fontSizeAndHeight[72]};
    font-weight: 700;
    color: ${colors.white};
    margin-top: 38px;
    margin-bottom: 5%;
    text-align: center;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 5%;
    color: ${colors.white};
`;

export const Carousel: FC<IProps> = (props) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [slideWidth, setSlideWidth] = useState<number>(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const cardMargin = 12;
    const offsetToCenter = slideWidth * currentIndex - (containerWidth - slideWidth) / 2;

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
    }, [props.children]);


    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % props.children.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + props.children.length) % props.children.length);
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
            <Title>{props.title}</Title>
            <CarouselTrack translateX={offsetToCenter}>
                {props.children.map((child, index) => (
                    <SlideContainer
                        key={index}
                        ref={index === 0 ? slideRef : null}
                        active={index === currentIndex}
                        cardMargin={cardMargin}
                    >
                        {child}
                    </SlideContainer>
                ))}
            </CarouselTrack>
            <ButtonsContainer>
                <ArrowBackIcon sx={{minWidth: "64px", height: "auto"}} onClick={handlePrev} />
                <ArrowForwardIcon sx={{minWidth: "64px", height: "auto"}} onClick={handleNext} />
            </ButtonsContainer>
        </CarouselWrapper>
    );
};
