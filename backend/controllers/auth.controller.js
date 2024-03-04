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
            gender
        } = req.body

        console.log({
            fullName,
            userName,
            password,
            confirmPassword,
            gender
        });
    } catch (error) {
        
    }
}