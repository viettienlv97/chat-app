import Message from '../../../models/v2/conversations/message.js'
import { dataResponse, invalidResponse, serverResponse } from '../../../utils/httpResponses'


export const sendMessage = async (req, res) => {
  try {
    const { userId } = req
    const { conversationId, content } = req.body

    const message = await Message.create({userId, conversationId, content})
    
    return dataResponse(res, 200, message)
  } catch (error) {
    console.log('Error in sendMessage', error)
    return serverResponse(res, 500)
  }
}
