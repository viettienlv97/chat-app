import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
const router = express.Router()

router.get('/login', login)

router.post('/logout', logout)

router.post('/signup', signup)


export default router