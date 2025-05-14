import { Box } from "@mui/material";
import { FC } from "react"
import styled from "styled-components";
import { colors } from "../../styleHelpers/colors";
import { fontSizeAndHeight } from "../../styleHelpers/fontsSize";
import moment from "moment";
import { FavouriteButton } from "./FavouriteButton";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setFavourites } from "../../reducers/cryptoReducer";

export const Name = styled.div`
    font-weight: 700;
    margin-top: 2rem;
    ${fontSizeAndHeight[32]};
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    align-items: center;
    gap: 8px;
`

interface ISingleCryptoCard {
    id: string;
    name: string;
    price: number;
    date: string;
    isFavourite: boolean;
    active: boolean;
}

export const SingleCryptoCard:FC<ISingleCryptoCard> = (props) => {
    const dispatch = useAppDispatch();

    const onFavouriteChange = () => {
        dispatch(setFavourites(props.id));
    };

    return (
        <Box sx={{
            width: {sm: '498px', xs: '318px'},
            height: {sm: '458px', xs: '528px'},
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: `${colors.darkGrey}`,
            borderRadius: "10px",
            border: `1px, solid, ${colors.black}`,
            scale: `${props.active ? "1" : "0.8"}`,
            color: `${colors.white}`,
            position: "relative",
            transition: "scale 0.7s ease"

        }}>
            <Box
                component="img"
                src={require(`../../images/${props.id}.png`)}
                alt="crypto logo"
                sx={{
                    width: '150px',
                    height: '150px',
                    marginTop: '3rem'
                }}
            />
            <Name>{props.name}</Name>
            <Info>
                <Box sx={{display: 'flex', flexDirection: {sm: "row", xs: "column"}, gap: '8px', alignItems: 'center', marginBottom: {sm: "0", xs: "8px"}}}>
                    <span>Current price: </span>
                    <span>${props.price}</span>
                </Box>
                <Box sx={{display: 'flex', flexDirection: {sm: "row", xs: "column"}, gap: '8px', alignItems: 'center'}}>
                    <span>Last check: </span>
                    <span>{moment.utc(props.date).local().format('MM/DD/YYYY h:mm a')}</span>
                </Box>
            </Info>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem'
                }}
            >
                <FavouriteButton onClick={onFavouriteChange} isFavourite={props.isFavourite}/>
            </Box>
        </Box>
    )
}

