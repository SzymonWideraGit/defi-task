import { useMemo } from 'react';
import { useAppSelector } from './reduxHooks';

export enum CryptoUnits {
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
};

export const useWalletValue = () => {
    const data = useAppSelector(state => state.cryptoData);
    const walletValue = useMemo(() => {
        const sum = data.reduce((total, elem) => {
        const amount = Number(elem.amount) || 0;
        const unit = CryptoUnits[elem.unit?.toUpperCase() as keyof typeof CryptoUnits] || 0;
        return total + amount * unit * elem.price;
    }, 0);
    return sum.toFixed(2);
    }, [data]);

    return walletValue;
};