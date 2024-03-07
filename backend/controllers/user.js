//libs
//import bcryptjs from 'bcryptjs'
//import {v4 as uuid} from 'uuid'
//import { Op } from 'sequelize'

//modules
import { where } from 'sequelize'
import User from '../models/user.js'
import { dataResponse, serverResponse, invalidResponse } from '../utils/httpResponses.js'

//const genders = ['male', 'female']

export const getUsers = async (req, res) => {
    try {
        let users = await User.findAll()
    
        if (!users) return dataResponse(res, 200, [])
    
        return dataResponse(res, 200, users)
    } catch (error) {
        return serverResponse(res, 500, error.message)
    }
}

export const getUserDetail = async (req, res) => {
    try {
        let {id} = req.body
        let user = await User.findOne({
            where: id
        })
    
        if (!user) 
            return invalidResponse(res, 400, 'Invalid input')
    
        return dataResponse(res, 200, user)
    } catch (error) {
        return serverResponse(res, 500, error.message)
    }
}