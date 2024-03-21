import { DataTypes } from 'sequelize'
import sequelize from '../../../config/db.js'

const Message = sequelize.define(
  'Message',
  {
    ConversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Conversations',
        key: 'id'
      }
    },
    AuthorId: {
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
  },
  {
    tableName: 'Messages'
  }
)

export default Message
