import express from 'express';
import { connection } from './config/db.js';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import logCheck from './middlewares/logger.js';
import { requestLogger, errorLogger } from './middlewares/winstonLogger.js';
import logger from './utils/logger.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/uploads', express.static('uploads'));

// app.use(logCheck); // This is custom logger 

app.use(requestLogger);

// Routes
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);

app.use(errorLogger);

app.use((req, res) => {
    logger.warn(`404 Not Found - ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
});

connection();

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});