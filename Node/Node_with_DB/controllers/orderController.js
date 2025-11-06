import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async(req, res) => {
    try {
        const { id } = req.user;
        const { products } = req.body;

        let totalPrice = 0;

        for (const prod of products) {
            const product = await Product.findById(prod.productId);
            if (prod.count > product.stock) throw new Error(`You can only order ${product.stock} product of this ${prod.productId}`)
            if (!product) throw new Error(`Product not found: ${prod.productId}`);
            totalPrice += product.price * prod.count;
            const updatedStock = product.stock - prod.count
            await Product.findByIdAndUpdate(prod.productId, { $set: { stock: updatedStock } })
        }

        const newOrder = await Order.create({
            user: id,
            products,
            totalPrice,
            ...req.body
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message }, error);
    }
}

export const getOrder = async(req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message }, error);
    }
}
export const getMyOrder = async(req, res) => {
    try {
        const { id } = req.user;

        const orders = await Order.find({ user: id })
            .populate('user')
            .populate('products.productId');

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteOrder = async(req, res) => {
    try {
        const { id } = req.params
        await Order.findByIdAndDelete(id)
        res.status(204)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateOrderStatus = async(req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

export const getOrdersBySeller = async(req, res) => {
    try {
        const { sellerId } = req.params;

        const sellerProducts = await Product.find({ seller: sellerId }).select('_id');

        if (sellerProducts.length === 0) {
            return res.status(404).json({ message: "No products found for this seller" });
        }
        const productIds = sellerProducts.map(prod => prod._id);

        const orders = await Order.find({ 'products.productId': { $in: productIds } })
            .populate('user', 'name email')
            .populate('products.productId', 'name price seller')
            .sort({ orderDate: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelOrder = async(req, res) => {
    try {
        const { id } = req.user;
        const orederId = req.params.id;
        let order = await Order.findById(orederId)

        if (order.status !== 'pending') throw new Error(`Order already ${order.status}`)

        order = await Order.findOneAndUpdate({ _id: orederId, user: id }, { status: "cancelled" }, { new: true })
        if (!order) throw new Error('No order Found for you')
        if (order.paymentMethod !== 'COD') {
            order = await Order.findOneAndUpdate({ _id: orederId, user: id }, { refundProcess: 'processing', refundTime: Date.now(), refundMsg: "Refund will initiated in 7 working days" }, { new: true })
        }

        for (const prod of order.products) {
            const product = await Product.findById(prod.productId);
            const updatedStock = product.stock + prod.count
            await Product.findByIdAndUpdate(prod.productId, { $set: { stock: updatedStock } })
        }

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateRefund = async(req, res) => {
    try {
        const { id } = req.params

        const order = await Order.findByIdAndUpdate(id, req.body, { new: true })
        if (!order) throw new Error('No order Found for you')
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}