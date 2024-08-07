import jwt from 'jsonwebtoken'
import {
  serverResponse,
  unauthorizedResponse,
  invalidResponse
} from '../utils/httpResponses.js'
import {User} from '../models/v2/index.js'

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if (!token)
      return unauthorizedResponse(res, 'Unauthorized - No token provided')

    console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded)
      return unauthorizedResponse(res, 'Unauthorized - Invalid token')

    const user = await User.findByPk(decoded.userId)
    if (!user) return invalidResponse(res, 401, 'User not found')

    req.userId = decoded.userId
    next()
  } catch (error) {
    return serverResponse(res, 500, error.message)
  }
}

export default protectRoute
