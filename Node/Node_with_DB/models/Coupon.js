import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },

})