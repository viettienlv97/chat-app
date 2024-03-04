import bcryptjs from 'bcryptjs'
import {
    getAllUsers,
    getUserByName,
    findUser,
    addUser
} from '../services/user.service.js'

const genders = ['male', 'female']

export const login = (req, res) => {
    console.log("Login User");
    res.send("Login")
}

export const logout = (req, res) => {
    console.log("Logout User");
}

export const signup = async (req, res) => {
    try {
        const {
            fullName,
            userName,
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
        let user = await findUser('user_name', userName)
        if (!user) {
            user = await findUser('email', email)
        }

        if (user && user.length) {
            res.status(400).json({
                error: 'user existed'
            })
            return
        }

        if (!genders.includes(gender)) {
            res.status(400).json({
                error: 'invalid input',
                value: gender
            })
            return
        }

        // TODO
        // HASH PASSWORD
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        console.log(hashedPassword);

        let boyProfilePicUrl = `https://avatar.iran.liara.run/public/boy?userName=${userName}`
        let girlProfilePicUrl = `https://avatar.iran.liara.run/public/girl?userName=${userName}`
        let profilePic = gender === 'male' ? boyProfilePicUrl : girlProfilePicUrl

        let add = await addUser({
            fullName,
            userName,
            password: hashedPassword,
            confirmPassword,
            gender,
            email,
            profilePic
        })

        console.log("add", add);

        if (!add.success) {
            res.status(400).json(add)
        }

        res.status(201).json(add)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}