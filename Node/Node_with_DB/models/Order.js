import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async function(v) {
                const user = await mongoose.model('User').findById(v);
                return !!user;
            },
            message: "Please Enter a valid User ID"
        }
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            validate: {
                validator: async function(v) {
                    const product = await mongoose.model('Product').findById(v);
                    return !!product;
                },
                message: "Please Enter a valid Product ID"
            },
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        count: Number,
        price: Number,
        _id: false
    }],
    discount: Number,
    totalPrice: Number,
    finalPrice: Number,
    orderDate: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'UPI', 'Credit-Card', 'Debit-Card', 'EMI'],
        default: 'COD'
    },
    address: {
        house: String,
        street: String,
        landmark: String,
        pincode: Number,
        city: String,
        state: String,
        country: { type: String, default: 'India' },
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'delivered', 'refund', 'refunded'],
        default: 'pending'
    },
    refundProcess: {
        type: String,
        enum: ['processing', 'initiated', 'cancelled', 'Done'],
    },
    refundTime: {
        type: Date
    },
    refundMsg: {
        type: String,
    },
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema)