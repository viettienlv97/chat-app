/*
    structure:
    {
        id: [Primary key] Number (Auto increase),
        title: String,
        content: String
    }

    //Example instance:
    user = [
        {
            id: 1,
            fullName: Full Name,
            userName: userName,
            password: password,
            email: email,
            ...
        },
        ...
    ]

*/
const user = {
    user_id: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    user_name: {
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
    email: {
        type: String,
        required: true,
    },
    profile_pic: {
        type: String,
        default: '',
    }
}

export default user