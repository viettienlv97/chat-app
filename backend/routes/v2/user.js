import express from 'express'
const router = express.Router()

import { searchUser, openSelfChat } from '../../controllers/v2/users/user.js'
import protectRoute from '../../middleware/protectRoute.js'

router.get('/', protectRoute, searchUser)
router.post('/open-selfchat', protectRoute, openSelfChat)

export default router