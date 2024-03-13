import { DataTypes, Op } from 'sequelize'

import sequelize from '../config/db.js'
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

export default User
