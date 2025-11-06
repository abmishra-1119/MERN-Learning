import Product from "../models/Product.js";

export const createProduct = async(req, res) => {
    try {
        const { id } = req.user;
        const { title, description, price, stock } = req.body;

        if (!title || !description || !price || !stock) {
            return res.status(404).json("All field required")
        }

        const newProduct = new Product({ sellerId: id, ...req.body })
        await newProduct.save()

        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

export const getAllProducts = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit)

        const totalProducts = await Product.countDocuments()

        res.status(200).json({
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            products
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getProductById = async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateProduct = async(req, res) => {
    try {
        const update = req.body;
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, update, { new: true })
        if (!product) throw new Error(`Enter a valid id: ${id}`)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params
        await Product.findByIdAndDelete(id)
        res.status(200).json({ message: "Product Deleted Succesfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getMyProduct = async(req, res) => {
    try {
        const { id } = req.user
        const products = await Product.find({ sellerId: id })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteMyProduct = async(req, res) => {
    try {
        const userId = req.user.id
        const { id } = req.params
        await Product.findOneAndDelete({ _id: id, sellerId: userId })
        res.status(200).json({ message: "Product Deleted Succesfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateMyProduct = async(req, res) => {
    try {
        const userId = req.user.id
        const update = req.body;
        const { id } = req.params
        const product = await Product.findOneAndUpdate({ _id: id, sellerId: userId }, update, { new: true })
        if (!product) throw new Error(`Enter a valid id: ${id}`)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}