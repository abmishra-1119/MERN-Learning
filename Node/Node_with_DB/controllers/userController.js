import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const createUser = async(req, res) => {
    try {
        const { name, email, age, password } = req.body
        if (!name || !email || !age || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const find = await User.findOne({ email: email })
        if (find) {
            return res.status(400).json({ message: "Email is already registered" })
        }
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, age, password: hashedPassword })
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
        console.error(e);
    }
}

export const updateUser = async(req, res) => {
    try {
        const { name, email, age } = req.body
        if (!name || !email || !age) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const find = await User.findOne({ email: email })
        if (find) {
            return res.status(400).json({ message: "Email is already registered" })
        }
        const { id } = req.params
        const data = await User.findByIdAndUpdate(id, req.body, { new: true })
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