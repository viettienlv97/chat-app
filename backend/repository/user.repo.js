import pool from "../db/connectPostgresDB.js";
import user from "../models/user.model.js";

export const getAll = async () => {
    let text = `SELECT * FROM users`
    let res = await pool.query(text)
    return 0
}

export const getUserBy = async (key, value) => {
    let text = `SELECT * FROM users
                WHERE ${key} = $1`
    let res = await usersQuerry(text, [value])
    return res
}

export const createUser = async ({
    id,
    fullName,
    userName,
    password,
    gender,
    email,
    profilePic
}) => {
    let text = `INSERT INTO
                users(user_id, full_name, user_name, user_password, gender, email, profile_pic)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`

    let value = [id, fullName, userName, password, gender, email, profilePic]

    let res = await usersQuerry(text, value)
    return res
}

const usersQuerry = async (text, value) => {
    try {
        let res  = await pool.query(text, value)
        return {
            success: true,
            data: res.rows
        }
    } catch (error) {
        return {
            success: false,
            msg: error.message
        }
    }
}