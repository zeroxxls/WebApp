import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import process from 'node:process'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Роуты
app.use('/auth', authRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
