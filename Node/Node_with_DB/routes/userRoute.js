import express from 'express'
import { createUser, delteUser, getUser, getUserById, login, profile, updateUser } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/', createUser);
router.post('/login', login)
router.get('/', getUser);
router.get('/profile', authMiddleware, profile)
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', delteUser);

export default router;