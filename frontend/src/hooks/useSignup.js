import { useState } from "react"
import toast from "react-hot-toast"
import axios from 'axios'

const useSignup = () => {
    const [loading, setLoading] = useState(false)

    const signup = async ({fullname, username, password, confirmPassword, email, gender}) => {
        const success = handleInputErrors({fullname, username, password, confirmPassword, email, gender})
        if (!success) return

        setLoading(true)
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({fullname, username, password, confirmPassword, email, gender: gender.toLowerCase()})
            })
            const data = await res.json()
            console.log("data", data);

            if(!data.success) throw new Error(data.error)

            localStorage.setItem('chat-user', data)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, signup}
}

export default useSignup

function handleInputErrors({fullname, username, password, confirmPassword, email, gender}) {
    if (!fullname || !username || !password || !confirmPassword || !email || !gender) {
        toast.error('Please fill in all fields')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords are not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
    }

    return true
}