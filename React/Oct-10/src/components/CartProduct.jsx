import React from 'react';

const CartProduct = ({ product }) => {
    return (
        <div className='cart-product-box'>
            <div className='cart-product' >
                <div className='cart-product-image-box'>
                    <img className='cart-product-image' src={product.thumbnail} alt={product.title} />
                </div>
                <div>
                    <p>${product.price}</p>
                </div>
                <div>
                    <p>Count:{product.count}</p>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default CartProduct;
