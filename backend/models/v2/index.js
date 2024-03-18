import Conversation, {
  ConversationParticipant
} from './conversations/conversation.js'
import Message from './conversations/message.js'
import User from './users/user.js'
import FriendShip from './users/friendShips.js'

User.hasMany(FriendShip, {
  foreignKey: 'senderId'
})
User.hasMany(FriendShip, {
  foreignKey: 'receiverId'
})
FriendShip.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender'
})
FriendShip.belongsTo(User, {
  foreignKey: 'receiverId',
  as: 'receiver'
})

// Conversation
User.hasMany(Message, {
  foreignKey: 'authorId',
  as: 'messages'
})

Message.belongsTo(User, {
  as: 'User'
})

Message.belongsTo(Conversation, {
  as: 'Conversation'
})
Conversation.hasMany(Message, {
  foreignKey: 'conversationId',
  as: 'messages'
})

User.belongsToMany(Conversation, {
  through: ConversationParticipant
})
Conversation.belongsToMany(User, {
  through: ConversationParticipant
})

Conversation.hasMany(ConversationParticipant, {
  foreignKey: 'ConversationId'
})

ConversationParticipant.belongsTo(Conversation, {
  as: 'Conversation'
})

ConversationParticipant.belongsTo(User, {
  as: 'User'
})

User.hasMany(ConversationParticipant, {
    foreignKey: 'UserId'
})

export { User, FriendShip, Message, Conversation, ConversationParticipant }
