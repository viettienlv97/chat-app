import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                let res = await fetch('/api/users')
                res = await res.json()

                if (!res.success) throw new Error(res.msg)

                setConversations(res.data)
            } catch (error) {
                toast.error(error)
            } finally {
                setLoading(false)
            }
        }

        getConversations()
    },[])

    return {loading, conversations}
}

export default useGetConversations