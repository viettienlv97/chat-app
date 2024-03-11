import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
    const [loading, setLoading] = useState(false)

    const {setAuthUser} = useAuthContext()

    const login = async ({username, password}) => {
        setLoading(true)
        const success = handleInputErrors({username, password})
        if (!success) return


        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            })
            const data = await res.json()

            if(!data.success) throw new Error(data.msg)

            localStorage.setItem('chat-user', JSON.stringify(data.data))
            setAuthUser(data.data)
            toast.success('Login successfully')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, login}
}

export default useLogin

function handleInputErrors({username, password}) {
    if (!username || !password) {
        toast.error('Please fill in all fields')
        return false
    }

    return true
}