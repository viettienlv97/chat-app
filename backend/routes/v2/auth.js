import express from 'express'
const router = express.Router()

import { signup, login, logout } from '../../controllers/v2/auth/auth.js'

router.post('/login', login)
router.post('/logout', logout)
router.post('/signup', signup)

export default router