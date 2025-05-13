import { FC } from "react"
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styleHelpers/colors";
import { fontSizeAndHeight } from "../styleHelpers/fontsSize";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Wrapper = styled.div`
    background: linear-gradient(90deg, ${colors.darkGrey} 15%, ${colors.grey} 100%);
    width: 25%;
    border-right: 1px solid #332E2E;
`;

const HyperLink = styled(NavLink)`
    width: 100%;
    color: ${colors.white};
    font-weight: 700;
    ${fontSizeAndHeight[16]}
    &.active {
        > div {
            background: linear-gradient(90deg, ${colors.middleGrey} 40%, ${colors.lightGrey} 100%);
            color: ${colors.black}
        }
    }
`

const ContentBox = styled.div`
    display: flex;
    gap: 8px;
    height: 67px;
    width: 100%;
    align-items: center;
    padding-left: 16px;
`

export const Menu:FC = () => {
    return (
        <Wrapper>
            <HyperLink to={'/'}>
                <ContentBox>
                    <AttachMoneyIcon/>
                    <span>Pick Favourites</span>
                </ContentBox>
            </HyperLink>
            <HyperLink to={'favourites'}>
                <ContentBox>
                    <FavoriteIcon />
                    <span>My cryptocurrencies</span>
                </ContentBox>
            </HyperLink>
        </Wrapper>
    )
}

