import { Op } from 'sequelize'
import { ConversationParticipant, Message } from '../../../models/v2/index.js'
import {
  dataResponse,
  invalidResponse,
  serverResponse
} from '../../../utils/httpResponses.js'
import { getReceiverSocketId } from '../../../socket/socket.js'

export const sendMessage = async (req, res) => {
  try {
    const { userId } = req
    const { conversationId, content } = req.body

    if (!conversationId || !content)
      return invalidResponse(res, 400, 'Invalid input')

    const message = await Message.create({
      AuthorId: userId,
      ConversationId: conversationId,
      content
    })

    const receiverId = await ConversationParticipant.findOne({
      where: {
        [Op.and]: [{ ConversationId: conversationId }, {[Op.not]: {UserId: userId}}]
      }
    })

    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit('newMessage', message)
    }

    return dataResponse(res, 200, message)
  } catch (error) {
    console.log('Error in sendMessage', error)
    return serverResponse(res, 500)
  }
}

export const getMessages = async (req, res) => {
  try {
    const { userId } = req
    const { conversationId } = req.body

    const messages = await Message.findAll({
      where: { ConversationId: conversationId }
    })

    return dataResponse(res, 200, messages)
  } catch (error) {
    console.log('Error in getMessages', error)
    return serverResponse(res, 500, error)
  }
}
