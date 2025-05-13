import { Box } from "@mui/material"
import { FC, useMemo } from "react"
import { colors } from "../styleHelpers/colors"
import styled from "styled-components";
import { fontSizeAndHeight } from "../styleHelpers/fontsSize";
import { useAppSelector } from "../hooks/hooks";

const CompanyName = styled.div`
    font-family: 'Jersey 10';
    ${fontSizeAndHeight[72]}
`;

enum CryptoUnits {
    BITCOIN = 1,
    SATOSHI = 1e-8,
    MBTC = 1e-3,
    ETHEREUM = 1,
    WEI = 1e-18,
    GWEI = 1e-9,
    SOLANA = 1,
    LAMPORT = 1e-9,
    MSOL = 1e-3,
    POLKADOT = 1,
    MDOT = 1e-3,
    KDOT = 1e3,
    POLYGON = 1,
    MMATIC = 1e-3,
    GWEIMATIC = 1e-9,
}

export const Header:FC = () => {
    const data = useAppSelector(state => state.cryptoData);
    const walletValue = useMemo(() => {
        const sum = data.reduce((sum, elem) => {
            const amount = Number(elem.amount) || 0;
            const unit = CryptoUnits[elem.unit?.toUpperCase() as keyof typeof CryptoUnits] || 0;
            return sum + amount * unit * elem.price;
        } , 0);
        return sum.toFixed(2);
    }, [data])
    
    
    return (
        <Box sx={{
            height: "135px",
            backgroundColor: `${colors.darkGrey}`,
            display: "flex",
            justifyContent: "space-between",
            color: `${colors.white}`,
            padding: "0 3rem 0 3rem",
            alignItems: "center"
        }}>
            <CompanyName>CryptoWatcher</CompanyName>
            <div>My wallet USD value: ${walletValue}</div>
        </Box>
    )
}

