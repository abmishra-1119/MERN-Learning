import express from 'express'
import { cancelOrder, createOrder, getMyOrder, getOrder, getOrdersBySeller, updateOrderStatus, updateRefund } from '../controllers/orderController.js'
import { authMiddleware, sellerMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, createOrder)
router.get('/', getOrder)
router.get('/my', authMiddleware, getMyOrder)
router.get('/seller', authMiddleware, sellerMiddleware, getOrdersBySeller)
router.put('/status/:id', authMiddleware, sellerMiddleware, updateOrderStatus)
router.put('/cancel/:id', authMiddleware, cancelOrder)
router.put('/refund/:id', authMiddleware, sellerMiddleware, updateRefund)


export default router