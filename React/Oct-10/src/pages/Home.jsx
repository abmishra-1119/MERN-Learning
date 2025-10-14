import React from 'react';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useFetch } from '../hooks/useFetch';

const Home = () => {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const fetchData = async () => {
        setLoading(true)
        const data = await useFetch({ url: `/products`, method: 'GET' })
        setProducts(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, []);

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
                    <div>Loading...</div>
            }
        </div>
    );
}

export default Home;
