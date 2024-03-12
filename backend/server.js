import path from 'path'
import dotenv from 'dotenv'
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({path: envFile})

import express from 'express'
import cookieParser from 'cookie-parser'
import sequelize from './config/db.js'

import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import messageRoutes from './routes/message.js'
import {app, server} from './socket/socket.js'

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})
// Only run on env.dev
sequelize.sync({ force: false }).then(() => {
    console.log(`Drop and Resync with { force: false }`);
    server.listen(PORT, () => {
        console.log(`Running on http://localhost:${PORT}`);
    });
});

//app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))