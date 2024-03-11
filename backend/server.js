import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import sequelize from './config/db.js'

import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import messageRoutes from './routes/message.js'
import {app, server} from './socket/socket.js'

const PORT = process.env.PORT || 5000

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello world!!")
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)

// Only run on env.dev
sequelize.sync({ force: false }).then(() => {
    console.log(`Drop and Resync with { force: false }`);
    server.listen(PORT, () => {
        console.log(`Running on http://localhost:${PORT}`);
    });
});

//app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))