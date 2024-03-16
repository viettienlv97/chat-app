import { DataTypes } from 'sequelize'
import sequelize from '../../../config/db.js'
//import ConversationParticipant from './conversationParticipant.js'
import Message from './message.js'
import User from '../users/user.js'

const Conversation = sequelize.define('Conversations', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
  }
})

export const ConversationParticipant = sequelize.define(
  'ConversationParticipants',
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Conversations',
        key: 'id'
      }
    }
  },
  {
    indexes: [
      {
        unique: true,
        primaryKey: true,
        fields: ['userId', 'conversationId']
      }
    ]
  }
)

// Conversation.hasMany(ConversationParticipant, {
//   foreignKey: 'conversationId',
//   as: 'conversationParticipants'
// })

Conversation.hasMany(Message, {
  foreignKey: 'conversationId',
  as: 'messages'
})

Conversation.belongsToMany(User, {
  through: ConversationParticipant
})

export default Conversation
