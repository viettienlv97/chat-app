import { serverResponse } from "../../../utils/httpResponses";
import Message from "../../../models/v2/conversations/message";
import Conversation, {ConversationParticipant} from "../../../models/v2/conversations/conversation";

export const createConversation = async (req, res) => {
  try {
    const {userId} = req
    const {receiverId} = req.params
    
  } catch (error) {
    console.log("Error in createConversation", error);
    return serverResponse(res, 500)
  }
}
