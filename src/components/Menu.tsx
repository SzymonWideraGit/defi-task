import { FC } from "react"
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styleHelpers/colors";
import { fontSizeAndHeight } from "../styleHelpers/fontsSize";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from "@mui/material";
import { useWalletValue } from "../hooks/useWalletValue";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const HyperLink = styled(NavLink)`
    width: 100%;
    color: ${colors.white};
    font-weight: 700;
    ${fontSizeAndHeight[16]};
    &.active {
        > div {
            background: linear-gradient(90deg, ${colors.middleGrey} 40%, ${colors.lightGrey} 100%);
            color: ${colors.black}
        };
    };
`;

const ContentBox = styled.div`
    display: flex;
    gap: 8px;
    height: 67px;
    width: 100%;
    align-items: center;
    padding-left: 16px;
`;

export const Menu:FC = () => {
    return (
        <Box sx={{background: `linear-gradient(90deg, ${colors.darkGrey} 0%, ${colors.grey} 100%)`,
            borderRight: `1px solid ${colors.darkGrey}`,
            width: {sm: '25%', xs: '100%'}
        }}>
            <Box sx={{display: {sm: 'none', xs: 'block'}, color: `${colors.white}`}}>
                <ContentBox>
                    <AccountBalanceWalletIcon />
                    <span>My wallet USD value: ${useWalletValue()}</span>
                </ContentBox>
            </Box>
            <HyperLink to={'/'}>
                <ContentBox>
                    <AttachMoneyIcon />
                    <span>Pick Favourites</span>
                </ContentBox>
            </HyperLink>
            <HyperLink to={'favourites'}>
                <ContentBox>
                    <FavoriteIcon />
                    <span>My cryptocurrencies</span>
                </ContentBox>
            </HyperLink>
        </Box>
    )
}

