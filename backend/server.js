import path from 'path'
import dotenv from 'dotenv'
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
dotenv.config({ path: envFile })

import express from 'express'
import cookieParser from 'cookie-parser'
import sequelize from './config/db.js'

import morgan from 'morgan'
import authRoutes from './routes/v2/auth.js'
import conversationRoutes from './routes/v2/conversation.js'
import userRoutes from './routes/v2/user.js'
import messageRoutes from './routes/v2/message.js'

import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v2/auth', authRoutes)
app.use('/api/v2/conversations', conversationRoutes)
app.use('/api/v2/users', userRoutes)
app.use('/api/v2/messages', messageRoutes)

//app.use('/api/users', userRoutes)
//app.use('/api/messages', messageRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

const syncForce = false

sequelize.sync({force: syncForce}).then(() => {
  console.log(`Drop and Resync with { force: ${syncForce ? 'true' : 'false'} }`)
    server.listen(PORT, () => {
      console.log(`Running on http://localhost:${PORT}`)
    })
})

// Only run on env.dev


//app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
