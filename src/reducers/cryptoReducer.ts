import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from '../data.json'

interface IMyCryptoDetails {
    comment: string;
    amount: string;
    unit: string;
    id: string;
};

interface ICryptoItem extends IMyCryptoDetails {
    price: number;
    isFavourite: boolean;
    updated: string;
    name: string;
};

const initialState: ICryptoItem[] = data.map(elem => ({
    id: elem.id,
    price: elem.price,
    amount: "",
    unit: "",
    comment: '',
    name: '',
    isFavourite: false,
    updated: new Date().toISOString()
}));

const cryptoSlice = createSlice({
    name: 'cryptoData',
    initialState: initialState,
    reducers: {
        setInitialCryptoData(state, action: PayloadAction<ICryptoItem[]>) {
            return action.payload;
        },
        updatePrices(state) {
            state.forEach((item) => {
                item.price += 1;
                item.updated = new Date().toISOString()
            });
            localStorage.setItem('cryptoCurrencies', JSON.stringify(state));
        },
        setFavourites(state, action: PayloadAction<string>) {
            const id = action.payload;
            const item = state.find((el) => el.id === id);
            if (item) {
                item.isFavourite = !item.isFavourite;
            }
            localStorage.setItem('cryptoCurrencies', JSON.stringify(state));
        },
        updateMyCryptoData(state, action: PayloadAction<IMyCryptoDetails>) {
            const { id, amount, unit, comment } = action.payload;
            const item = state.find((el) => el.id === id);
            if (item) {
                item.amount = amount;
                item.unit = unit;
                item.comment = comment
            }
            localStorage.setItem('cryptoCurrencies', JSON.stringify(state))
        },
    },
});

export const { setInitialCryptoData, updatePrices, updateMyCryptoData, setFavourites } = cryptoSlice.actions;
export default cryptoSlice.reducer