
import { RouterProvider } from 'react-router';
import router from './routes';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/reduxHooks';
import { setInitialCryptoData, updatePrices } from './reducers/cryptoReducer';

function App() {
    const dispatch = useAppDispatch();
    const cryptoData = localStorage.getItem('cryptoCurrencies');

    useEffect(() => {
        if (cryptoData) {
            const cryptoArray = JSON.parse(cryptoData)
            dispatch(setInitialCryptoData(cryptoArray));
        }
        const interval = setInterval(() => {
            dispatch(updatePrices());
        }, 60000);
        return () => clearInterval(interval);
    }, [])

    return (
        <RouterProvider router={router} />
    );
}

export default App;
