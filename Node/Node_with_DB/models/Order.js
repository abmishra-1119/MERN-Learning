import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        count: Number
    }],
    total: Number

})

export default mongoose.model('Order', OrderSchema)