import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import sequelize from './config/db.js'

import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world!!")
})

app.use('/api/auth', authRoutes)
app.use('/api', userRoutes)

// Only run on env.dev
sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync with { force: false }');
    app.listen(PORT, () => {
        console.log(`Running on http://localhost:${PORT}`);
    });
});

//app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))