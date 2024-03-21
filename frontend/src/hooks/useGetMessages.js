import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      const conversationId = selectedConversation.id
      try {
        let res = null
        res = await fetch(`/api/v2/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId })
        })
        const jsonRes = await res?.json()
        if (!jsonRes.success) {
          throw new Error(jsonRes)
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
