import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name will be greater than 3'],
        maxLength: [30, 'Enter a valid length'],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z]+$/.test(value)
            },
            message: 'Name must be Alphabetic'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: 'Enter a valid Email'
        }
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        validate: {
            validator: function(value) {
                return /^[0-9]/.test(value)
            },
            message: 'Enter a valid age'
        },
        min: [18, "age must be greater than 18 "],
        max: [99, "Enter a valid age"]
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'seller'],
        default: 'user'
    },
    cart: [{
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
        count: Number
    }]
})


export default mongoose.model('User', UserSchema)