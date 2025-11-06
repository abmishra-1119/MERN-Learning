import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        minLength: [3, 'Title will be greater than 3'],
        maxLength: [30, 'Enter a valid length'],
    },
    description: {
        type: String,
        minLength: [5, 'Description will be greater than 3'],
        maxLength: [80, 'Enter a valid length'],
    },
    price: Number,
    stock: Number
})

export default mongoose.model('Product', ProductSchema)