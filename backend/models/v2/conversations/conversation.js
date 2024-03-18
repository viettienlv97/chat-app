import { DataTypes } from 'sequelize'
import sequelize from '../../../config/db.js'

const Conversation = sequelize.define(
  'Conversation',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'Conversations'
  }
)

export const ConversationParticipant = sequelize.define(
  'ConversationParticipant',
  {
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    ConversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Conversations',
        key: 'id'
      }
    }
  },
  {
    tableName: 'ConversationParticipants',
    indexes: [
      {
        unique: true,
        primaryKey: true,
        fields: ['UserId', 'ConversationId']
      }
    ]
  }
)

// Conversation.hasMany(ConversationParticipant, {
//   foreignKey: 'conversationId',
//   as: 'conversationParticipants'
// })

// Conversation.hasMany(Message, {
//   foreignKey: 'conversationId',
//   as: 'messages'
// })

// Conversation.belongsToMany(User, {
//   through: ConversationParticipant
// })

export default Conversation