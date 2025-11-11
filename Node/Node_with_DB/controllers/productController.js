import Product from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";

export const createProduct = asyncHandler(async(req, res) => {
    const { id } = req.user;
    const { title, description, price, stock } = req.body;
    const image = req.file;

    if (!title || !description || !price || !stock || !image) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const newProduct = new Product({
        sellerId: id,
        ...req.body,
        thumbnail: image.path,
    });

    await newProduct.save();

    return successResponse(res, 201, "Product created successfully", newProduct);
});

export const getAllProducts = asyncHandler(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().select("-__v -createdAt -updatedAt").skip(skip).limit(limit)

    const totalProducts = await Product.countDocuments()

    return successResponse(res, 200, "Products fetched successfully", {
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        products,
    });
});


export const getProductById = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).select("-__v -createdAt -updatedAt");

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    return successResponse(res, 200, "Product fetched successfully", product);
});

export const updateProduct = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const update = req.body;

    const product = await Product.findByIdAndUpdate(id, update, { new: true });

    if (!product) {
        res.status(404);
        throw new Error(`No product found with ID: ${id}`);
    }

    return successResponse(res, 200, "Product updated successfully", product);
});

export const deleteProduct = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        res.status(404);
        throw new Error(`No product found with ID: ${id}`);
    }

    return successResponse(res, 200, "Product deleted successfully");
});

export const getMyProduct = asyncHandler(async(req, res) => {
    const { id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ sellerId: id }).select("-__v -createdAt -updatedAt").skip(skip).limit(limit);

    const totalProducts = await Product.countDocuments({ sellerId: id })

    return successResponse(res, 200, "My products fetched successfully", {
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        products,
    });
});


export const deleteMyProduct = asyncHandler(async(req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id, sellerId: userId });

    if (!product) {
        res.status(404);
        throw new Error("No product found or unauthorized access");
    }

    return successResponse(res, 200, "Product deleted successfully");
});

export const updateMyProduct = asyncHandler(async(req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const update = req.body;

    const product = await Product.findOneAndUpdate({ _id: id, sellerId: userId },
        update, { new: true }
    );

    if (!product) {
        res.status(404);
        throw new Error("No product found or unauthorized access");
    }

    return successResponse(res, 200, "Product updated successfully", product);
});

export const searchProduct = asyncHandler(async(req, res) => {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ $text: { $search: query } }).select("-__v -createdAt -updatedAt").skip(skip).limit(limit);

    const totalProducts = await Product.countDocuments({ $text: { $search: query } })

    if (products.length === 0) {
        res.status(404);
        throw new Error("No products found for this search query");
    }

    return successResponse(res, 200, "Search results", {
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        products,
    });
});