import express from 'express'
import { createProduct, deleteMyProduct, deleteProduct, getAllProducts, getMyProduct, getProductById, updateMyProduct, updateProduct } from '../controllers/productController.js'
import { authMiddleware, sellerMiddleware } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/upload.js';
const router = express.Router()

router.post('/', authMiddleware, sellerMiddleware, createProduct)
router.get('/', getAllProducts)
router.get('/my', authMiddleware, sellerMiddleware, getMyProduct)
router.delete('/my/:id', authMiddleware, sellerMiddleware, deleteMyProduct)
router.put('/my/:id', authMiddleware, sellerMiddleware, updateMyProduct)
router.get('/:id', getProductById)
router.put('/:id', authMiddleware, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)


router.post('/image', upload.single('image'), (req, res) => {
    res.json({
        message: 'File uploaded successfully!',
        file: req.file
    });
});

export default router