import express from 'express'
const router = express.Router()
import {
  getUsers,
  getUserDetail,
  getUsersForSidebar,
  updateUserSelfChat
} from '../controllers/user.js'
import protectRoute from '../middleware/protectRoute.js'
//import {signup, login, logout} from '../controllers/auth.js'

//router.get('/', protectRoute, getUsers)
router.get('/', protectRoute, getUsersForSidebar)
router.post('/', protectRoute, getUserDetail)
router.post('/update-self-chat', protectRoute, updateUserSelfChat)

export default router
