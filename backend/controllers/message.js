import { Op } from 'sequelize'

import Conversation from '../models/conversation.js'
import Message from '../models/message.js'
import {
  dataResponse,
  serverResponse,
  invalidResponse
} from '../utils/httpResponses.js'
import { getReceiverSocketId, io } from '../socket/socket.js'

export const sendMessage = async (req, res) => {
  try {
    let { userId } = req
    let { id: receiverId } = req.params
    let { textMessage } = req.body

    let userIds = [userId, receiverId]
    console.log(userIds)
    console.log('textMessage', textMessage)

    let newMessage = await Message.create({
      senderId: userId,
      receiverId,
      message: textMessage
    })

    Conversation.findOne({
      where: {
        userIds: {
          [Op.contains]: userIds
        }
      }
    }).then((conversation) => {
      if (conversation) {
        console.log(conversation.messageIds)
        let updateMessageIds = [...conversation.messageIds, newMessage.id]
        console.log(updateMessageIds)
        conversation
          .update({
            messageIds: updateMessageIds
          })
          .then(() => {
            console.log('Update success')
          })
          .catch((error) => {
            console.error('Update error', error)
          })
      } else {
      }
    })

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

    let conversation = await Conversation.findOne({
      where: {
        userIds: {
          [Op.contains]: [userId, receiverId]
        }
      }
    })

    let userIds = [userId, receiverId]

    if (!conversation) {
      Conversation.create({
        userIds,
        messageIds: []
      })
    }

    if (!conversation) return dataResponse(res, 200, [])

    let messages = await Message.findAll({
      where: {
        id: { [Op.in]: conversation.messageIds }
      }
    })

    return dataResponse(res, 200, messages)
  } catch (error) {
    console.log(error)
    return serverResponse(res, 500, error.message)
  }
}
