import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import { useConversationContext } from '../context/ConversationContext'
import { useNavigate } from 'react-router-dom'

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const { setConversations } = useConversationContext()
  const { authUser, setAuthUser } = useAuthContext()
  const navigate = useNavigate()

  const getConversations = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/v2/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonRes = await res.json()
      if (!jsonRes.success) {
        if (res.status == 401) {
          setConversations(jsonRes.data || [])
          throw new Error('unauthorized')
        }
        throw new Error(res.msg)
      }
      jsonRes?.data ? setConversations(jsonRes.data) : setConversations([])
    } catch (error) {
      if (error.message === 'unauthorized') {
        localStorage.removeItem('chat-user')
        setAuthUser(null)
        navigate('/login')
      }
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   //getSelfChat()
  //   //getConversations()
  // }, [])

  return { loading, getConversations }
}

export default useGetConversations
