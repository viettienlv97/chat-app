import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  const { authUser } = useAuthContext()

  const sendMessage = async (message) => {
    console.log(selectedConversation)

    setLoading(true)
    try {
      const res = await fetch(`/api/v2/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          content: message
        })
      })

      const jsonRes = await res.json()
      if (!jsonRes.success) {
        throw new Error(res.msg)
      }

      setMessages([...messages, res.data])
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, sendMessage }
}

export default useSendMessage
