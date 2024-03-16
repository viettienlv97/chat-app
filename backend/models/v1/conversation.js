import { DataTypes, Op } from 'sequelize'
//import sequelize from '../../config/db.js'

// Model
const Conversation = sequelize.define('Conversation', {
  userIds: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: false
  },
  messageIds: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: []
  }
})

// Create
export const createSelfConversation = async (userIds) => {
  try {
    if (!userIds || userIds.length === 0 || userIds.length > 1) return null

    const conversation = await Conversation.create({
      userIds,
      messageIds: []
    })

    return conversation
  } catch (error) {
    console.log('Error in createSelfConversation', error)
    return null
  }
}

export const createConversation = async (userIds) => {
  try {
    if (!userIds || userIds.length < 2) return null

    const conversation = await Conversation.create({
      userIds,
      messageIds: []
    })

    return conversation
  } catch (error) {
    console.log('Error in createConversation', error)
    return null
  }
}

export const createGroupConversation = async (userIds) => {
  try {
    const conversation = await createConversation(userIds)
    return conversation
  } catch (error) {
    console.log('Error in createGroupConversation', error)
    return null
  }
}

// Read
export const findConversation = async (userIds) => {
  try {
    if (!userIds || userIds.length === 0) return null

    const conversation = await Conversation.findOne({
      where: {
        userIds: {
          [Op.contains]: userIds
        }
      }
    })

    return conversation
  } catch (error) {
    console.log("Error in findConversation", error)
    return null
  }
}

export const findAllConversation = async (userIds) => {
  try {
    if (!userIds || userIds.length < 2) return null
    
    const conversations = Conversation.findAll({
      where: {
        userIds: {
          [Op.contains]: userIds
        }
      }
    })

    return conversations
  } catch (error) {
    console.log("Error in findAllConversation", error)
    return null
  }
}

// Update
export const updateMessagesConversation = async (conversation, messageIds) => {
  try {
    if (!conversation || !messageIds) return null

    const updatedConv = await conversation.update({messageIds})
    
    return updatedConv
  } catch (error) {
    console.log("Error in updateMessagesConversation", error)
    return null
  }
}

export default Conversation
