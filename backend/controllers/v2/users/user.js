import { Op } from 'sequelize'

import User from '../../../models/v2/users/user.js'

import {
  dataResponse,
  serverResponse,
  invalidResponse
} from '../../../utils/httpResponses.js'

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
    return serverResponse(res, 500, error)
  }
}


