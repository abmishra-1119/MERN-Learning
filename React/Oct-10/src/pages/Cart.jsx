import CartProduct from "../components/CartProduct";

const Cart = () => {

    const product = {
        title: 'phone',
        thumbnail: 'image.png',
        price: 50000,
        count: '5'
    }
    return (
        <div className="cart">
            <CartProduct product={product} />
            <CartProduct product={product} />
            <CartProduct product={product} />
            <CartProduct product={product} />
        </div>
    );
}

export default Cart;
