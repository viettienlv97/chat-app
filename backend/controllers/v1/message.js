import { Op } from 'sequelize'

import {
  createConversation,
  createSelfConversation,
  findConversation,
  updateMessagesConversation
} from '../../models/v1/conversation.js'
import Message from '../../models/v1/message.js'
import {
  dataResponse,
  serverResponse,
  invalidResponse
} from '../../utils/httpResponses.js'
import { getReceiverSocketId, io } from '../../socket/socket.js'

export const sendMessage = async (req, res) => {
  try {
    let { userId } = req
    let { id: receiverId } = req.params
    let { textMessage } = req.body

    let userIds = [userId, receiverId]

    let newMessage = await Message.create({
      senderId: userId,
      receiverId,
      message: textMessage
    })

    const conversation = await findConversation(userIds)

    if (conversation) {
      const updateMessageIds = [...conversation.messageIds, newMessage.id]

      const updatedConv = await updateMessagesConversation(
        conversation,
        updateMessageIds
      )
      if (!updatedConv) console.error('Update error')
      else console.log('Update success')
    }

    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    return dataResponse(res, 200, newMessage)
  } catch (error) {
    console.log(error)
    return serverResponse(res, 500, error.message)
  }
}

export const getMessages = async (req, res) => {
  try {
    const { userId } = req
    const { id: receiverId } = req.params

    let userIds = [userId, receiverId]

    let conversation = await findConversation(userIds)

    if (!conversation) {
      await createConversation(userIds)

      return dataResponse(res, 200, [])
    } else {
      let messages = await Message.findAll({
        where: {
          id: { [Op.in]: conversation.messageIds }
        }
      })

      return dataResponse(res, 200, messages)
    }
  } catch (error) {
    console.log(error)
    return serverResponse(res, 500, error.message)
  }
}

export const getSelfChatMessages = async (req, res) => {
  try {
    const { userId } = req
    const userIds = [userId]
    let conversation = await findConversation(userIds)

    if (!conversation) {
      await createSelfConversation(userIds)
      return dataResponse(res, 200, [])
    } else {
      let messages = await Message.findAll({
        where: {
          id: { [Op.in]: conversation.messageIds }
        }
      })

      return dataResponse(res, 200, messages)
    }
  } catch (error) {
    console.log(error)
    return serverResponse(res, 500, error.message)
  }
}
