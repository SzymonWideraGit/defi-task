import { FC } from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { colors } from '../../styleHelpers/colors';

const Button = styled(IconButton)`
    color: ${colors.red} !important;
`;

interface IProps {
    onClick(): void;
    isFavourite: boolean;
}


export const FavouriteButton:FC<IProps> = (props) => {
    return (
        <>
            {props.isFavourite ? (
                <Button onClick={props.onClick}>
                    <FavoriteIcon sx={{ minWidth: "32px", height: "auto" }}/>
                </Button>
            ) : (
                <Button color="error" onClick={props.onClick}>
                    <FavoriteBorderIcon sx={{ minWidth: "32px", height: "auto" }} />
                </Button>
            )}
        </>
    );
}

