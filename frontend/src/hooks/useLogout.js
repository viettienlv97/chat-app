import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useConversationContext } from '../context/ConversationContext'
import toast from 'react-hot-toast'

const useLogout = () => {
  const [loading, setLoading] = useState(false)

  const { setAuthUser } = useAuthContext()
  const { setConversations } = useConversationContext()

  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/v2/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json()

      if (!data.success) {
        throw new Error(data)
      }

      localStorage.removeItem('chat-user')
      setAuthUser(null)
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, logout }
}

export default useLogout
