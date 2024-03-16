import { DataTypes, Op } from 'sequelize'
import sequelize from '../../config/db.js'
import Message from './message.js'

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING
  },
  isOpenSelfChat: {
    type: DataTypes.BOOLEAN
  }
})

User.hasMany(Message, {
  as: 'sentMessage',
  foreignKey: 'senderId'
})
User.hasMany(Message, {
  as: 'receivedMessage',
  foreignKey: 'receiverId'
})

// Create
// TODO

// Read
export const findOrCreateUser = async (userData) => {
  try {
    if (!userData) return null

    const { username, email } = userData

    let [user, created] = await User.findOrCreate({
      where: {
        [Op.or]: [{ username }, { email }]
      },
      defaults: userData
    })

    if (!user) return null

    return { user, created }
  } catch (error) {
    console.log('Error in findOrCreateUser', error)
    return null
  }
}

export const findUserByUserOrEmail = async (username) => {
  try {
    if (!username) return null
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }]
      }
    })

    if (!user) return null

    return user
  } catch (error) {
    console.log('Error in findUserByUserOrEmail', error)
    return null
  }
}

// Update
export const updateSelfChat = async (userId, isOpenSelfChat = false) => {
  try {
    if (!userId) return null

    const user = await User.findByPk(userId)

    if (!user) return null

    const updatedUser = await user.update({ isOpenSelfChat })

    return updatedUser
  } catch (error) {
    console.log('Error in updateSelfChat', error)
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
