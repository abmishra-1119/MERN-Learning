import React, { useCallback } from 'react';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';

const Home = () => {

    const { products, isLoading } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const fetchData = useCallback(async () => {
        await dispatch(fetchProducts())
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
