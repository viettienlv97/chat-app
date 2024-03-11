import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            let res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({textMessage: message})
            })

            res = await res.json()
            if (!res.success) {throw new Error(res.msg)}
            
            setMessages([...messages, res.data])
        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return {loading, sendMessage}
}

export default useSendMessage