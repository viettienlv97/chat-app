import pool from "../db/connectPostgresDB";

const user = {
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    profilePic: {
        type: String,
        default: '',
    }
}

export default user