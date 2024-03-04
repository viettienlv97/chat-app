import {v4 as uuid} from 'uuid'

import {
    getUserBy,
    getAll,
    createUser
} from '../repository/user.repo.js'

export const getUserByName = async (user_name) => {
    let res = await getUserBy('user_name', user_name)
    return res
}

export const getAllUsers = async () => {
    let res = await getAll()
    return res
}

export const findUser = async (key, value) => {
    let res = await getUserBy(key, value)
    return res
}

export const addUser = async (user) => {
    let res = await createUser({
        id: uuid(),
        ...user
    })
    return res
}