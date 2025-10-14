import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
    // console.log(product);

    return (

        <Link className='link' to={`product/${product.id}`}>

            <div className='card'>
                <p>Title: {product.title}</p>
                <p>Description: {product.description}</p>
                <p>Price:  {product.price}</p>
                <p>Stock: {product.stock}</p>
            </div>
        </Link>

    );
}

export default ProductCard;
