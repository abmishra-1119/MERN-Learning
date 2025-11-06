import express from 'express'
import { addToCart, createUser, deleteFromCart, delteUser, emptyCart, getAllSeller, getCart, getUser, getUserById, login, profile, updateUser } from '../controllers/userController.js'
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRoute.js';
import { getUserSchema, loginSchema, registerSchema, updateUserSchema } from '../validations/userValidation.js';

const router = express.Router()

router.post('/', validateRequest(registerSchema), createUser);
router.post('/login', validateRequest(loginSchema), login)
router.get('/', getUser);
router.get('/seller', authMiddleware, adminMiddleware, getAllSeller);
router.get('/profile', authMiddleware, profile)
router.get('/cart', authMiddleware, getCart)
router.put('/cart', authMiddleware, addToCart)
router.put('/cart/empty', authMiddleware, emptyCart)
router.put('/cart/:id', authMiddleware, deleteFromCart)
router.get('/:id', validateRequest(getUserSchema, "params"), getUserById);
router.put('/:id', validateRequest(updateUserSchema), updateUser);
router.delete('/:id', delteUser);

export default router;