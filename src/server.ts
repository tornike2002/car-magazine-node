import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import carouselRoutes from './routes/carousel'
import categoryRoutes from './routes/category'
import tagsRoutes from './routes/tags'
import vehicleFilterRoutes from './routes/vehicleFilter'
import carRoutes from './routes/car'
dotenv.config()

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)

app.use('/api/carousel', carouselRoutes)

app.use('/api/category', categoryRoutes)

app.use('/api/tags', tagsRoutes)

app.use('/api/vehicle-filter', vehicleFilterRoutes)

app.use('/api/cars', carRoutes)

export default app
