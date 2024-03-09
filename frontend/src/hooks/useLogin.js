import { useState } from "react"


const useLogin = () => {
    const [loading, setLoading] = useState(false)

    const login = () => {
        
    }
    return {loading, login}
}

export default useLogin