import express from 'express'
const router = express.Router()
import {
  getUsers,
  getUserDetail,
  getUsersForSidebar
} from '../controllers/user.js'
import protectRoute from '../middleware/protectRoute.js'
//import {signup, login, logout} from '../controllers/auth.js'

//router.get('/', protectRoute, getUsers)
router.get('/', protectRoute, getUsersForSidebar)
router.post('/', protectRoute, getUserDetail)

export default router
