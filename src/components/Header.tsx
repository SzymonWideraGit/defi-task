import { Box } from "@mui/material"
import { FC } from "react"
import { colors } from "../styleHelpers/colors"
import styled from "styled-components";
import { fontSizeAndHeight } from "../styleHelpers/fontsSize";
import { useWalletValue } from "../hooks/useWalletValue";

const CompanyName = styled.div`
    font-family: 'Jersey 10';
    ${fontSizeAndHeight[72]};
`;

export const Header:FC = () => {
    return (
        <Box sx={{
            height: "135px",
            backgroundColor: `${colors.darkGrey}`,
            display: "flex",
            justifyContent: {sm: 'space-between', xs: 'center'},
            color: `${colors.white}`,
            padding: {sm: '0 3rem 0 3rem', xs: '0'},
            alignItems: "center"
        }}>
            <CompanyName>CryptoWatcher</CompanyName>
            <Box sx={{display:{sm: 'block', xs: 'none'}}}>My wallet USD value: ${useWalletValue()}</Box>
        </Box>
    )
}

