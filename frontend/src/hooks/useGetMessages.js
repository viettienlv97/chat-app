import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { authUser } = useAuthContext()
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      const isSelfChat = selectedConversation.isSelfChat
      setLoading(true)
      try {
        let res = null
        if (isSelfChat) {
          res = await fetch(`/api/messages/self-chat`)
        } else {
          res = await fetch(`/api/messages/${selectedConversation.id}`)
        }

        const jsonRes = await res.json()

        if (!jsonRes.success) {
          throw new Error(jsonRes.msg)
        }
        setMessages(jsonRes.data)
      } catch (error) {
        toast.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (selectedConversation?.id) getMessages()
  }, [selectedConversation?.id, setMessages])

  return { messages, loading }
}

export default useGetMessages
