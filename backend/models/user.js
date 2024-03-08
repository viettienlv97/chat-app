import { DataTypes } from "sequelize"

import sequelize from "../config/db.js"
import Message from "./message.js"

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePic: {
        type: DataTypes.STRING,
    }
})

User.hasMany(Message, {
    as: 'sentMessage',
    foreignKey: 'senderId'
})
User.hasMany(Message, {
    as: 'receivedMessage',
    foreignKey: 'receiverId'
})

export default User