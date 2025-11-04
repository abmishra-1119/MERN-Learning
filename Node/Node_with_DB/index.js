import express from 'express'
import { connection } from './config/db.js'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import logCheck from './middlewares/logger.js'

dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(logCheck)

app.use('/users', userRoute)
app.use('/products', productRoute)

connection()
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})