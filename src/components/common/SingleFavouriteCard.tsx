import { Box, Button, InputBase, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { colors } from '../../styleHelpers/colors';
import styled from 'styled-components';
import { Info, Name } from './SingleCryptoCard';
import { CustomScrollBar } from './CustomScrollBar';
import { useAppDispatch } from '../../hooks/hooks';
import { setFavourites, updateMyCryptoData } from '../../reducers/cryptoReducer';
import { FavouriteButton } from './FavouriteButton';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CustomInput = styled(InputBase)({
    '.MuiInputBase-input': {
        borderRadius: 4,
        backgroundColor: `${colors.inputs}`,
        border: `1px solid ${colors.white}`,
        color: `${colors.white}`,
        padding: '15px 12px',
        fontFamily: 'Inter'
    }
});

const CustomSelectInput = styled(Select)(({ theme }) => ({
    color: `${colors.white} !important`,
    backgroundColor: `${colors.inputs}`,
    border: `1px solid ${colors.white}`,
    "fieldset": {
        border: "none"
    },
}));

const Label = styled(InputLabel)({
    color: 'white !important',
    fontFamily: 'Inter !important',
    marginBottom: '4px'
});

const cryptoUnits = {
    btc: [
        'Bitcoin',
        'Satoshi',
        'mBTC',
    ],
    eth: [
        'Ethereum',
        'Wei',
        'Gwei',
    ],
    sol: [
        'Solana',
        'Lamport',
        'mSOL',
    ],
    dot: [
        'Polkadot',
        'mDOT',
        'kDOT',
    ],
    pol: [
        'Polygon',
        'Gwei',
        'mMATIC',
    ],
};

interface ISingleFavouriteCard {
    id: string;
    name: string;
    price: number;
    amount: string;
    isFavourite: boolean;
    updated: Date;
    comment: string;
    unit: string;
    active: boolean;
};

interface IData {
    id: string;
    amount: string;
    unit: string;
    comment: string;
};

export const SingleFavouriteCard:FC<ISingleFavouriteCard> = (props) => {
    const defaultState = {
        id: props.id,
        amount: props.amount,
        unit: props.unit,
        comment: props.comment
    };
    const dispatch = useAppDispatch();
    const [data, setData] = useState<IData>(defaultState);

    useEffect(() => {
        setData(defaultState)
    }, [props.active]);
    
    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e?.target?.value.replace(',', '.').replaceAll(' ', '');
        if (/^\d+\.?\d*$/.test(value) || value === '') {
            setData({...data, amount: value});
        }
    };

    const onUnitChange = (event: SelectChangeEvent<unknown>) => {
        const value = event?.target?.value as string;
        setData({...data, unit: value});
    };

    const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e?.target?.value;
        setData({...data, comment: value});
    };

    const onSubmit = () => {
        dispatch(updateMyCryptoData(data));
    };

    const onFavouriteChange = () => {
        dispatch(setFavourites(props.id));
    };

    return (
        <Box sx={{
            width: {sm: '498px', xs: '318px'},
            height: {sm: '478px', xs: '878px'},
            backgroundColor: `${colors.darkGrey}`,
            borderRadius: "10px",
            border: `1px solid, ${colors.black}`,
            color: `${colors.white}`,
            position: "relative",
            scale: `${props.active ? "1" : "0.8"}`,
            transition: "scale 0.7s ease"
        }}>
            <CustomScrollBar>
                <Container>
                    <Box
                        component="img"
                        src={require(`../../images/${props.id}.png`)}
                        alt="crypto logo"
                        sx={{
                            width: '150px',
                            height: '150px',
                            marginTop: '3rem',
                        }}
                    />
                    <Name>{props.name}</Name>
                    <Info>
                        <span>
                            Current price: ${props.price}
                        </span>
                        <span>
                            Value in USD: $520.00
                        </span>
                    </Info>
                    <Box sx={{width: {sm: "350px", xs: "294px"}, marginTop: '5%', marginBottom: '20px'}}>
                        <Label>Amount:</Label>
                        <CustomInput onChange={onAmountChange} value={data.amount} sx={{width: {sm: "350px", xs: "294px"}}}/>
                    </Box>
                    <Box sx={{width: {sm: "350px", xs: "294px"}, marginBottom: '20px'}}>
                        <Label>Unit:</Label>
                        <CustomSelectInput onChange={onUnitChange} value={data.unit} sx={{width: {sm: "350px", xs: "294px"}}}>
                            {cryptoUnits?.[props.id as keyof typeof cryptoUnits]?.map(elem => (
                                <MenuItem key={elem} value={elem}>{elem}</MenuItem>
                            ))}
                        </CustomSelectInput>
                    </Box>
                    <Box sx={{width: {sm: "350px", xs: "294px"}, marginBottom: '20px'}}>
                        <Label>Comment:</Label>
                        <CustomInput sx={{width: {sm: "350px", xs: "294px"}}} onChange={onCommentChange} value={data?.comment}/>
                    </Box>
                </Container>
                <Button onClick={onSubmit}>Submit</Button>
            </CustomScrollBar>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                }}
            >
                <FavouriteButton isFavourite={props.isFavourite} onClick={onFavouriteChange}/>
            </Box>
        </Box>
    );
};
