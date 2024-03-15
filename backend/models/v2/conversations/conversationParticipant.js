import { DataTypes } from 'sequelize'
import sequelize from '../../../config/db.js'
import User from '../users/user.js'

const ConversationParticipant = sequelize.define(
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

ConversationParticipant.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})
// ConversationParticipant.belongsTo(, {
//     foreignKey: 'userId',
//     as: 'user'
// })

export default ConversationParticipant
