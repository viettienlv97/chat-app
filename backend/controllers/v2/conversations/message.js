import { Op } from 'sequelize'
import { ConversationParticipant, Message } from '../../../models/v2/index.js'
import {
  dataResponse,
  invalidResponse,
  serverResponse
} from '../../../utils/httpResponses.js'
import { getSocketId } from '../../../socket/socket.js'
import { io } from '../../../socket/socket.js'
export const sendMessage = async (req, res) => {
  try {
    const { userId } = req
    const { conversationId, content, isSelfChat, receiverId } = req.body

    if (!conversationId || !content)
      return invalidResponse(res, 400, 'Invalid input')

    const message = await Message.create({
      AuthorId: userId,
      ConversationId: conversationId,
      content
    })

    // const receiverSocketId = isSelfChat ? null : getReceiverSocketId(receiverId)
    // if (receiverSocketId) {
    //   // io.to(<socket_id>).emit() used to send events to specific client
    //   io.to(receiverSocketId).emit('newMessage', message)
    // }
    if (!isSelfChat)
      socketEmitMessage({message, conversationId, receiverId, senderId: userId})

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

const socketEmitMessage = (notify) => {
  const receiverSocketId = getSocketId(notify.receiverId)
  if (receiverSocketId) {
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit('newMessage', notify.message)
    io.to(receiverSocketId).emit('notifyMessage', notify)
  }
}
