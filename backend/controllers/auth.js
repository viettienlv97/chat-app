//libs
import bcryptjs from 'bcryptjs'
import {v4 as uuid} from 'uuid'
import { Op } from 'sequelize'

//modules
import generateTokenAndSetCookie from '../utils/generateToken.js'
import User from '../models/user.js'
import FriendsList from '../models/friendsList.js'

const genders = ['male', 'female']

export const signup = async (req, res) => {
    try {
        const {
            fullname,
            username,
            password,
            confirmPassword,
            gender,
            email
        } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Password don't match"
            })
        }
        let newId = uuid()

        if (!genders.includes(gender)) {
            return res.status(400).json({
                error: 'Invalid input',
                value: gender
            })
        }

        let salt = await bcryptjs.genSalt(10)
        let hashedPassword = await bcryptjs.hash(password, salt)

        let boyProfilePicUrl = `https://avatar.iran.liara.run/public/boy?userName=${username}`
        let girlProfilePicUrl = `https://avatar.iran.liara.run/public/girl?userName=${username}`
        let profilePic = gender === 'male' ? boyProfilePicUrl : girlProfilePicUrl
        
        let userData = {
            id: newId,
            fullname,
            username,
            password: hashedPassword,
            email, 
            gender,
            profilePic
        }

        
        let [user, created] = await User.findOrCreate({
            where: {
                [Op.or]: [{username}, {email}]
            },
            defaults: userData
        })

        let friendsList

        if (!created) {
            return res.status(200).json({msg: 'username or email existed'})
        } else {
            friendsList = await FriendsList.create({
                userId: newId,
                friendIds: []
            })
        }

        
        
        generateTokenAndSetCookie(newId, res)
        let userResponse = {
            id: user.id, 
            gender: user.gender,
            fullname: user.fullname,
            profilePic: user.profilePic,
            friendsList
        }
        
        return res.status(200).json({success: true, data: userResponse})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}

export const login = async (req, res) => {
    try {
        let {username, password} = req.body

        let user = await User.findOne({
            where: {
                [Op.or]: [{username}, {email: username}]
            }
        })

        if (!user)
            return res.status(400).json({
                success: false,
                msg: 'user not exist'
            })
        
        let isPasswordCorrect = await bcryptjs.compare(password, user?.password || '')
        if(!isPasswordCorrect) return res.status(400).json({
            success: false,
            msg: 'password incorrect'
        })

        let userResponse = {
            id: user.id, 
            gender: user.gender,
            fullname: user.fullname,
            profilePic: user.profilePic
        }

        generateTokenAndSetCookie(user.id, res)
        return res.status(200).json({
            success: true,
            data: userResponse
        })

    } catch(err) {
        console.log("error", err.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).json({
            success: true,
            msg: 'logged out successfully'
        })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}