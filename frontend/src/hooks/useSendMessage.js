import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  const { authUser } = useAuthContext()

  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/v2/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: selectedConversation.partner?.id,
          conversationId: selectedConversation.id,
          content: message,
          isSelfChat: selectedConversation.isSelfChat ?? false
        })
      })

      const jsonRes = await res.json()
      if (!jsonRes.success) {
        throw new Error(jsonRes.msg)
      }

      setMessages([...messages, jsonRes.data])
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, sendMessage }
}

export default useSendMessage
