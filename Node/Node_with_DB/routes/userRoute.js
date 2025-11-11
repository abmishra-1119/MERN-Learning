import express from 'express'
import {
    addToCart,
    createUser,
    deleteFromCart,
    deleteUser,
    emptyCart,
    forgotPassword,
    getAllSeller,
    getCart,
    getUser,
    getUserById,
    login,
    profile,
    resetPassword,
    sendOtp,
    updateUser,
    verifyOtpAndRegister
} from '../controllers/userController.js'
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validateRoute.js'
import { getUserSchema, loginSchema, registerSchema, updateUserSchema } from '../validations/userValidation.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: Full name of the user
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's hashed password
 *         age:
 *           type: number
 *           description: User's age
 *         role:
 *           type: string
 *           enum: [admin, user, seller]
 *         cart:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               count:
 *                 type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         name: "Abhishek Mishra"
 *         email: "abhishek@example.com"
 *         password: "hashedpassword"
 *         age: 25
 *         role: "user"
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/', validateRequest(registerSchema), createUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user and return JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 */
router.post('/login', validateRequest(loginSchema), login)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/', getUser)

/**
 * @swagger
 * /users/seller:
 *   get:
 *     summary: Get all sellers (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all sellers
 */
router.get('/seller', authMiddleware, adminMiddleware, getAllSeller)

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile details
 */
router.get('/profile', authMiddleware, profile)

/**
 * @swagger
 * /users/cart:
 *   get:
 *     summary: Get logged-in user's cart
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User cart
 */
router.get('/cart', authMiddleware, getCart)

/**
 * @swagger
 * /users/cart:
 *   put:
 *     summary: Add or update items in the cart
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               count:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */
router.put('/cart', authMiddleware, addToCart)

/**
 * @swagger
 * /users/cart/empty:
 *   put:
 *     summary: Empty the logged-in user's cart
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart emptied successfully
 */
router.put('/cart/empty', authMiddleware, emptyCart)

/**
 * @swagger
 * /users/cart/{id}:
 *   put:
 *     summary: Remove a specific item from cart
 *     tags: [Users]
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
 *         description: Product removed from cart
 */
router.put('/cart/:id', authMiddleware, deleteFromCart)

/**
 * @swagger
 * /users/forgot:
 *   post:
 *     summary: Request password reset (send OTP)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 */
router.post('/forgot', forgotPassword)

/**
 * @swagger
 * /users/reset:
 *   put:
 *     summary: Reset password using OTP
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.put('/reset', resetPassword)

/**
 * @swagger
 * /users/send-otp:
 *   post:
 *     summary: Send OTP for email verification
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/send-otp', sendOtp)

/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     summary: Verify OTP and complete registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/verify-otp', verifyOtpAndRegister)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 */
router.get('/:id', validateRequest(getUserSchema, 'params'), getUserById)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/:id', validateRequest(updateUserSchema), updateUser)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/:id', deleteUser)

export default router