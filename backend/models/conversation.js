import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Message from './message.js'

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

// const UserConversation = sequelize.define('UserConversation', {
//     userId: {
//       type: DataTypes.UUID,
//       references: {
//         model: 'Users',
//         key: 'id'
//       }
//     },
//     conversationId: {
//       type: DataTypes.UUID,
//       references: {
//         model: 'Conversations',
//         key: 'id'
//       }
//     }
//   });

// const MessageConversation = sequelize.define('MessageConversation', {
//     messageId: {
//         type: DataTypes.UUID,
//         references: {
//         model: 'Messages',
//         key: 'id'
//         }
//     },
//     conversationId: {
//         type: DataTypes.UUID,
//         references: {
//         model: 'Conversations',
//         key: 'id'
//         }
//     }
// });

// User.belongsToMany(Conversation, { through: UserConversation });
// Conversation.belongsToMany(User, { through: UserConversation });

// Message.belongsToMany(Conversation, { through: MessageConversation });
// Conversation.belongsToMany(Message, { through: MessageConversation });

export default Conversation
