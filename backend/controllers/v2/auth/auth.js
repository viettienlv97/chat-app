//libs
import bcryptjs from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { Op } from 'sequelize'

//modules
import generateTokenAndSetCookie from '../../../utils/generateToken.js'
import { User } from '../../../models/v2/index.js'
import {
  invalidResponse,
  dataResponse,
  serverResponse
} from '../../../utils/httpResponses.js'

const genders = ['male', 'female']

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender, email } =
      req.body

    if (password !== confirmPassword) {
      return invalidResponse(res, 400, "Password don't match")
    }
    let newId = uuid()

    if (!genders.includes(gender)) {
      return invalidResponse(res, 400, 'Invalid gender input')
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const boyProfilePicUrl = `https://avatar.iran.liara.run/public/boy?userName=${username}`
    const girlProfilePicUrl = `https://avatar.iran.liara.run/public/girl?userName=${username}`
    const profilePic = gender === 'male' ? boyProfilePicUrl : girlProfilePicUrl

    const userData = {
      id: newId,
      fullname,
      username,
      password: hashedPassword,
      email,
      gender,
      profilePic
    }

    const [findUser, created] = await User.findOrCreate({
      attributes: ['id', 'fullname', 'gender', 'profilePic', 'isOpenSelfChat'],
      where: {
        [Op.or]: [{ username: username }, { email: username }]
      },
      defaults: userData
    })

    console.log('findUser', findUser)
    console.log('created', created)

    if (!created) {
      return invalidResponse(res, 400, 'Username or Email existed')
    }

    generateTokenAndSetCookie(newId, res)

    return dataResponse(res, 200, findUser)
  } catch (error) {
    console.log(error)
    serverResponse(res, 500)
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({
      attributes: ['id', 'fullname', 'gender', 'profilePic', 'isOpenSelfChat'],
      where: {
        [Op.or]: [{ username }, { email: username }]
      }
    })

    if (!user) return invalidResponse(res, 400, 'User not exist')

    const userP = await User.findOne({
      attributes: ['password'],
      where: {
        [Op.or]: [{ username }, { email: username }]
      }
    })

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      userP?.password || ''
    )
    if (!isPasswordCorrect)
      return invalidResponse(res, 400, 'Password incorrect')

    generateTokenAndSetCookie(user.id, res)
    return dataResponse(res, 200, user)
  } catch (error) {
    console.log('Error', error)
    return serverResponse(res, 500)
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 })
    return dataResponse(res, 200, 'Logged out Successfully')
  } catch (error) {
    return serverResponse(res, 500)
  }
}
