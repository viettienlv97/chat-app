import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
dotenv.config()
import pool from './db/connectPostgresDB.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world!!")
})

app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))