import { DataTypes, Op } from 'sequelize'
import sequelize from '../../../config/db.js'
import User from './user.js'

const FriendShip = sequelize.define('FriendShips', {
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  isAccepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

FriendShip.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender'
})
FriendShip.belongsTo(User, {
  foreignKey: 'receiverId',
  as: 'receiver'
})

export const createFriendShip = async (userId, friendId) => {
  try {
    if (!userId || !friendId) return null
    let friendShip = await getFriendShip(userId, friendId)
    if (!friendShip) {
      const friendData = {
        senderId: userId,
        receiverId: friendId,
        isAccepted: false
      }
      friendShip = await FriendShip.create(friendData)
      return friendShip
    } else {
      return friendShip
    }
  } catch (error) {
    console.log('Error in createFriendShip', error)
    return null
  }
}

export const getFriendShip = async (userId, friendId, isInclude) => {
  try {
    const friendShip = await FriendShip.findOne({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId }
        ]
      },
      include: isInclude
        ? [
            { model: User, as: 'sender' },
            { model: User, as: 'receiver' }
          ]
        : []
    })

    return friendShip
  } catch (error) {
    console.log('Error in getFriendShip', error)
    return null
  }
}

export const getFriendInfo = async (userId, friendId) => {
  try {
    const friendShip = await getFriendShip(userId, friendId, true)
    if (!friendShip || !friendShip.isAccepted) return null

    const sender = friendShip.sender()
    const receiver = friendShip.receiver()
    if (!sender || !receiver) return null

    return sender.id === friendId ? sender : receiver
  } catch (error) {
    console.log('Error in getFriendInfo', error)
    return null
  }
}

export const getFriendsList = async (userId) => {
  try {
    let friendsList = await FriendShip.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, isAccepted: true },
          { receiverId: userId, isAccepted: true }
        ]
      }
    })

    if (!friendsList) return []
    return friendsList
  } catch (error) {
    console.log('Error in getFriendsList', error)
    return null
  }
}

export const updateAcceptFriend = async (userId, friendId) => {
  try {
    const friendShip = await FriendShip.findOne({
      where: {
        receiverId: userId,
        senderId: friendId
      }
    })

    if (!friendShip || friendShip.isAccepted) return null

    friendShip = await friendShip.update({ isAccepted: true })
    return friendShip
  } catch (error) {
    console.log('Error in updateAcceptFriend', error)
    return null
  }
}

export const deleteFriendShip = async (userId, friendId) => {
  try {
    const friendShip = await getFriendShip(userId, friendId)
    if (!friendShip) return null
    await friendShip.destroy()
    return true
  } catch (error) {
    console.log('Error in deleteFriendShip', error)
    return null
  }
}

export default FriendShip
