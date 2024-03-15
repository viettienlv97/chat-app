import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  const {authUser} = useAuthContext()

  const sendMessage = async (message) => {
    console.log(selectedConversation)

    setLoading(true)
    try {
      let res = null
      if (selectedConversation.isSelfChat) {
        res = await fetch(`/api/messages/send/${authUser.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ textMessage: message })
        })
      } else {
        res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ textMessage: message })
        })
      }

      res = await res.json()
      if (!res.success) {
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
