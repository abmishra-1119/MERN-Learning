import express from 'express'
import {
    createProduct,
    deleteMyProduct,
    deleteProduct,
    getAllProducts,
    getMyProduct,
    getProductById,
    searchProduct,
    updateMyProduct,
    updateProduct
} from '../controllers/productController.js'
import { adminMiddleware, authMiddleware, sellerMiddleware } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/upload.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         sellerId:
 *           type: string
 *           description: Reference to the seller (User)
 *         title:
 *           type: string
 *           description: Product title (3–30 chars)
 *         description:
 *           type: string
 *           description: Product description (5–80 chars)
 *         price:
 *           type: number
 *           description: Product price
 *         stock:
 *           type: number
 *           description: Available stock
 *         thumbnail:
 *           type: string
 *           description: Product image URL
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 64a8e2b2e35fca82dfb72d1b
 *         sellerId: 64a8dfe2c25b9a8e9f3d70b1
 *         title: "Wireless Headphones"
 *         description: "Noise-cancelling Bluetooth headphones"
 *         price: 99.99
 *         stock: 15
 *         thumbnail: "uploads/image123.jpg"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getAllProducts)

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by title or description
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query text
 *     responses:
 *       200:
 *         description: Matching products list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/search', searchProduct)

/**
 * @swagger
 * /products/my:
 *   get:
 *     summary: Get products created by the logged-in seller
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of seller's products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/my', authMiddleware, sellerMiddleware, getMyProduct)

/**
 * @swagger
 * /products/my/{id}:
 *   delete:
 *     summary: Delete a product created by the logged-in seller
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete('/my/:id', authMiddleware, sellerMiddleware, deleteMyProduct)

/**
 * @swagger
 * /products/my/{id}:
 *   put:
 *     summary: Update a product created by the logged-in seller
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put('/my/:id', authMiddleware, sellerMiddleware, updateMyProduct)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get('/:id', getProductById)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put('/:id', authMiddleware, adminMiddleware, updateProduct)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID (Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete('/:id', authMiddleware, deleteProduct)

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product (Seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []       
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - stock
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', upload.single('image'), authMiddleware, sellerMiddleware, createProduct)

export default router