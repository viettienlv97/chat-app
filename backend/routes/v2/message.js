import express from 'express'
const router = express.Router()

import {
  getMessages,
  sendMessage
} from '../../controllers/v2/conversations/message.js'
import protectRoute from '../../middleware/protectRoute.js'

router.post('/', protectRoute, getMessages)
router.post('/send', protectRoute, sendMessage)

export default router
