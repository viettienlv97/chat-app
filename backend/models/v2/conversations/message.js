import { DataTypes } from 'sequelize'
import sequelize from '../../../config/db.js'
import Conversation from './conversation.js'
import User from '../users/user.js'

const Message = sequelize.define('Messages', {
  conversationId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Conversations',
      key: 'id'
    }
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

Message.belongsTo(Conversation, {
  as: 'conversations'
})

Message.belongsTo(User, {
  as: 'users'
})

export default Message
