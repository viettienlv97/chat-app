import express from "express"
const router = express.Router()
import { getUsers, getUserDetail } from "../controllers/user.js"
//import {signup, login, logout} from '../controllers/auth.js'

router.get('/users', getUsers)
router.post('/users', getUserDetail)

export default router