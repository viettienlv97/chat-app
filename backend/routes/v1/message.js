import express from 'express'
const router = express.Router()

import {
  sendMessage,
  getMessages,
  getSelfChatMessages
} from '../controllers/message.js'
import protectRoute from '../../middleware/protectRoute.js'

router.get('/:id', protectRoute, getMessages)
router.get('/self-chat', protectRoute, getSelfChatMessages)
router.post('/send/:id', protectRoute, sendMessage)

export default router
