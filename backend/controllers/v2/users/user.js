import { Op } from 'sequelize'

import User from '../../../models/v2/users/user.js'

import {
  dataResponse,
  serverResponse,
  invalidResponse
} from '../../../utils/httpResponses.js'
import { createConversation } from '../conversations/conversation.js'

export const searchUser = async (req, res) => {
  try {
    const { userId } = req
    const { search } = req.query
    if (!search) return invalidResponse(res, 400, 'Search empty')

    const user = await User.findAll({
      attributes: ['id', 'fullname', 'username', 'profilePic'],
      where: {
        [Op.and]: [
          {
            id: { [Op.not]: userId }
          },
          {
            [Op.or]: [
              {
                fullname: {
                  [Op.iLike]: `%${search}%`
                },
                username: {
                  [Op.iLike]: `%${search}%`
                }
              }
            ]
          }
        ]
      }
    })

    if (!user) throw new Error('Cannot find user')

    return dataResponse(res, 200, user)
  } catch (error) {
    console.log('Error in searchUser', error)
    return serverResponse(res, 500, error)
  }
}

export const getAllUsers = async (req, res) => {
  try {
    let users = await User.findAll()

    return dataResponse(res, 200, users ? users : [])
  } catch (error) {
    return serverResponse(res, 500, error)
  }
}

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req
    const user = await User.findOne({
      where: userId
    })

    if (!user) return invalidResponse(res, 400, 'Invalid user')

    return dataResponse(res, 200, user)
  } catch (error) {
    console.log('Error in getUserInfo', error)
    return serverResponse(res, 500, error)
  }
}

export const openSelfChat = async (req, res) => {
  try {
    const { userId } = req
    const { name } = req.body
    if (!name || name !== 'selfchat') return invalidResponse(res, 400, 'Invalid input')
    const user = await User.findByPk(userId)
    if (!user) return invalidResponse(res, 400, 'User not found')

    const updatedUser = await user.update({isOpenSelfChat: true})
    console.log('updatedUser self chat', updatedUser.isOpenSelfChat)
    //return dataResponse(res, 200, updatedUser)

    return await createConversation(req, res)
  } catch (error) {
    console.log('Error in openSelfChat', error)
    return serverResponse(res, 500)
  }
}
