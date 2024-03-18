import express from 'express'
const router = express.Router()

import { createConversation, getConversations, getAllUsersInConversation } from '../../controllers/v2/conversations/conversation.js'
import protectRoute from '../../middleware/protectRoute.js'

router.get('/', protectRoute, getAllUsersInConversation)
router.post('/add', protectRoute, createConversation)
router.post('/', protectRoute, getConversations)
// router.post('/signup', signup)

export default router