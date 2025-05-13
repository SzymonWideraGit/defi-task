import { FC } from 'react';
import { SingleCryptoCard } from './common/SingleCryptoCard';
import { Carousel } from './common/Carousel';
import { useAppSelector } from '../hooks/hooks';



export const Home:FC = () => {
    const data = useAppSelector(state => state.cryptoData);
    return (
        <Carousel title='Pick favourites'>
            {data.map(elem => <SingleCryptoCard
                key={elem.id}
                id={elem.id}
                price={elem.price}
                date={elem.updated}
                name={elem.name}
                isFavourite={elem.isFavourite}
            />)}
        </Carousel>
  );
}

