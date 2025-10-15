import React, { useCallback } from 'react';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useFetch } from '../hooks/useFetch';
import { useAppContext } from '../context/AppContext';

const Home = () => {

    const { state, dispatch } = useAppContext()
    const { products, isLoading } = state

    const fetchData = useCallback(async () => {
        dispatch({ type: 'loading', payload: true })
        const data = await useFetch({ url: `/products`, method: 'GET' })
        dispatch({ type: 'products', payload: [...data] })
        dispatch({ type: 'loading', payload: false })
    }, [])

    useEffect(() => {
        fetchData()
    }, []);


    if (isLoading) {
        return (
            <>
                Loading..
            </>
        )
    }

    return (
        <div className='home'>
            {
                products.length > 0 ?
                    <div className='cardContainer'>
                        {
                            products.map((product) =>
                                <ProductCard key={product.id} product={product} />
                            )
                        }
                    </div>
                    :
                    <div>Product Not Found</div>
            }
        </div>
    );
}

export default Home;
