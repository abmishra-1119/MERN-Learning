// controllers/orderController.js
import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * POST /api/orders
 * Creates a new order with stock updates
 */
export const createOrder = async(req, res) => {
    try {
        const userId = req.user.id;
        const { products = [], discount = 0, paymentMethod, address } = req.body;

        // Validation
        if (!userId) throw new Error('Unauthorized');
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error('Products array is required');
        }

        // Fetch all products in one query
        const productIds = products.map(p => p.productId);
        const dbProducts = await Product.find({ _id: { $in: productIds } })
            .select('_id title price stock sellerId')
            .lean();

        if (dbProducts.length !== productIds.length) {
            throw new Error('One or more products not found');
        }

        const productMap = new Map(dbProducts.map(p => [p._id.toString(), p]));

        // Validate stock and calculate totals
        let totalPrice = 0;
        const enrichedProducts = [];

        for (const item of products) {
            const product = productMap.get(item.productId.toString());
            if (!product) throw new Error(`Product not found: ${item.productId}`);
            if (item.count > product.stock) {
                throw new Error(`Only ${product.stock} units available for ${product.title}`);
            }

            totalPrice += product.price * item.count;

            // console.log(product);

            enrichedProducts.push({
                productId: item.productId,
                sellerId: product.sellerId, // Denormalized for fast seller queries
                count: item.count,
                price: product.price // Snapshot price at order time
            });
        }

        const finalPrice = Math.max(0, totalPrice - (discount || 0));

        // Update stock for each product
        for (const item of enrichedProducts) {
            await Product.findByIdAndUpdate(
                item.productId, { $inc: { stock: -item.count } }
            );
        }

        // Create order
        const newOrder = await Order.create({
            user: userId,
            products: enrichedProducts,
            discount: discount || 0,
            totalPrice,
            finalPrice,
            paymentMethod: paymentMethod || 'COD',
            address
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/orders
 * Get all orders (admin only)
 */
export const getOrder = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const skip = (page - 1) * limit;

        const orders = await Order.find()
            .select('user products orderDate status totalPrice finalPrice paymentMethod')
            .populate('user', 'name email')
            .sort({ orderDate: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Order.countDocuments();

        res.status(200).json({
            orders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/orders/me
 * Get current user's orders
 */
export const getMyOrder = async(req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const orders = await Order.find({ user: userId })
            .select('products orderDate status totalPrice finalPrice paymentMethod address')
            .populate('products.productId', 'name price images')
            .sort({ orderDate: -1 })
            .lean();

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/orders/seller
 * Get orders for products belonging to the logged-in seller
 * Uses denormalized sellerId for fast queries
 */
export const getOrdersBySeller = async(req, res) => {
    try {
        const sellerId = req.user.id;
        if (!sellerId) return res.status(401).json({ message: 'Unauthorized' });

        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const skip = (page - 1) * limit;

        // Fast query using denormalized sellerId - no join needed!
        const orders = await Order.find({ 'products.sellerId': sellerId })
            .select('user products orderDate status totalPrice finalPrice')
            .populate('user', 'name email phone')
            .populate('products.productId', 'name price images')
            .sort({ orderDate: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Order.countDocuments({ 'products.sellerId': sellerId });

        res.status(200).json({
            orders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * PATCH /api/orders/:id/status
 * Update order status (admin/seller only)
 */
export const updateOrderStatus = async(req, res) => {
    try {
        const { id } = req.params;
        const { status, refundProcess, refundMsg } = req.body;

        const updateData = {};
        if (status) updateData.status = status;
        if (refundProcess) updateData.refundProcess = refundProcess;
        if (refundMsg) updateData.refundMsg = refundMsg;

        const order = await Order.findByIdAndUpdate(
                id,
                updateData, { new: true, runValidators: true }
            )
            .select('status refundProcess refundTime refundMsg orderDate')
            .lean();

        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * DELETE /api/orders/:id
 * Delete an order (admin only)
 */
export const deleteOrder = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await Order.findByIdAndDelete(id);

        if (!result) return res.status(404).json({ message: 'Order not found' });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * PATCH /api/orders/:id/cancel
 * Cancel order and restore stock
 */
export const cancelOrder = async(req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        if (!userId) throw new Error('Unauthorized');

        // Find order and verify ownership
        const order = await Order.findOne({ _id: orderId, user: userId });

        if (!order) throw new Error('Order not found or unauthorized');
        if (order.status !== 'pending') {
            throw new Error(`Cannot cancel order with status: ${order.status}`);
        }

        // Prepare update
        const updateData = { status: 'cancelled' };

        // Handle refund for non-COD payments
        if (order.paymentMethod !== 'COD') {
            Object.assign(updateData, {
                refundProcess: 'processing',
                refundTime: new Date(),
                refundMsg: 'Refund will be initiated in 7 working days'
            });
        }

        // Update order status
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            updateData, { new: true }
        );

        // Restore stock for each product
        for (const item of order.products) {
            await Product.findByIdAndUpdate(
                item.productId, { $inc: { stock: item.count } }
            );
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * PATCH /api/orders/:id/refund
 * Update refund status (admin only)
 */
export const updateRefund = async(req, res) => {
    try {
        const { id } = req.params;
        const { refundProcess, refundMsg, status } = req.body;

        const updateData = {};
        if (refundProcess) updateData.refundProcess = refundProcess;
        if (refundMsg) updateData.refundMsg = refundMsg;
        if (status) updateData.status = status;

        const order = await Order.findByIdAndUpdate(
                id,
                updateData, { new: true, runValidators: true }
            )
            .select('status refundProcess refundTime refundMsg')
            .lean();

        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};