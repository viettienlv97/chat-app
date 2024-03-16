import { DataTypes, Op } from 'sequelize'

import sequelize from '../../../config/db.js'
import FriendShip from './friendShips.js'
import Message from '../conversations/message.js'
import Conversation, {
  ConversationParticipant
} from '../conversations/conversation.js'

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  gender: {
    type: DataTypes.CHAR(6),
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING(255)
  },
  isOpenSelfChat: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

// FriendShip
User.hasMany(FriendShip, {
  foreignKey: 'senderId'
})
User.hasMany(FriendShip, {
  foreignKey: 'receiverId'
})

// Conversation
User.hasMany(Message, {
  foreignKey: 'authorId',
  as: 'messages'
})

User.belongsToMany(Conversation, {
  through: ConversationParticipant
})

export const findOrCreateUser = async (userData) => {
  try {
    if (!userData) return null

    const { username, email } = userData
    if (!username || !email) return null

    const [user, created] = await User.findOrCreate({
      where: {
        [Op.or]: [{ username }, { email }]
      },
      defaults: userData
    })

    if (!user) return null

    return { user, created }
  } catch (error) {
    console.log('Error at findOrCreateUser', error)
    return null
  }
}

//utils
export const getUserResponse = (user) => {
  if (!user) return null

  return {
    id: user.id,
    gender: user.gender,
    fullname: user.fullname,
    profilePic: user.profilePic,
    isOpenSelfChat: user.isOpenSelfChat
  }
}

export default User
