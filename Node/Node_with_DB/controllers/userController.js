import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { sendOtpEmail } from '../utils/mailer.js';
import Otp from "../models/Otp.js";

// let otpStore = {};

export const sendOtp = async(req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    await Otp.deleteMany({ email }); // remove previous OTPs

    await Otp.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await sendOtpEmail(email, otp);
    res.json({ message: 'OTP sent to email' });
};

export const verifyOtpAndRegister = async(req, res) => {
    const { name, email, password, otp } = req.body;

    const record = await Otp.findOne({ email });
    if (!record) return res.status(400).json({ message: 'OTP expired or not found' });

    if (record.otp !== otp)
        return res.status(400).json({ message: 'Invalid OTP' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
        return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, isVerified: true });
    await user.save();

    await Otp.deleteMany({ email });
    res.status(201).json({ message: 'User registered successfully' });
};


export const createUser = async(req, res) => {
    try {
        const { name, email, age, password, role } = req.body
        if (!name || !email || !age || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const find = await User.findOne({ email: email })
        if (find) {
            return res.status(400).json({ message: "Email is already registered" })
        }
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, age, password: hashedPassword, role })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body

        const find = await User.findOne({ email: email })

        if (!find) {
            return res.status(404).json({ error: "Invalid email address" })
        }
        const hashedPassword = find.password

        const isvalid = await bcrypt.compare(password, hashedPassword);

        if (isvalid) {
            const token = jwt.sign({ id: find._id }, process.env.JWT_KEY)
            return res.status(200).json({ message: "Login succesfully", user: find, token })
        } else {
            return res.status(404).json({ error: "Password does not match" })
        }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}


export const getUser = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit).select('-password');

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            users
        })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const getUserById = async(req, res) => {
    try {
        const { id } = req.params
        const data = await User.findById(id).select('-password')
        res.status(200).json([data])
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const updateUser = async(req, res) => {
    try {
        const { name, email, age, password } = req.body
        if (!name || !email || !age || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const { id } = req.params
        const hashedPassword = await bcrypt.hash(password, 10)

        const data = await User.findByIdAndUpdate(id, { name, email, age, password: hashedPassword }, { new: true })
        res.status(200).json([data])
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const delteUser = async(req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(204).json({ message: "User deleted Succesfully" })
    } catch (e) {
        console.error(e);
    }
}

export const profile = async(req, res) => {
    try {
        const { id } = req.user
        const data = await User.findById(id)
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const getCart = async(req, res) => {
    try {
        const { id } = req.user
        const data = await User.findById(id)
        res.status(200).json(data.cart)
    } catch (error) {
        res.status(500).json({ error: e.message })
    }
}

export const addToCart = async(req, res) => {
    try {
        const cart = req.body
        const { id } = req.user
        const data = await User.findByIdAndUpdate(id, { $push: { cart: cart } }, { new: true })
        res.status(200).json({ message: "Added to cart", data })
    } catch (error) {
        res.status(500).json({ error: e.message })
    }
}

export const deleteFromCart = async(req, res) => {
    try {
        const productId = req.params.id
        const { id } = req.user
        const data = await User.findByIdAndUpdate(id, { $pull: { cart: { productId } } }, { new: true })
        res.status(200).json({ message: "Remove from cart", data })
    } catch (error) {
        res.status(500).json({ error: e.message })
    }
}

export const emptyCart = async(req, res) => {
    try {
        const { id } = req.user
        const data = await User.findByIdAndUpdate(id, { $set: { cart: [] } }, { new: true })
        res.status(200).json({ message: "Cart is now empty", data })
    } catch (error) {
        res.status(500).json({ error: e.message })
    }
}

export const getAllSeller = async(req, res) => {
    try {
        const data = await User.find({ role: "seller" })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: e.message })
    }
}