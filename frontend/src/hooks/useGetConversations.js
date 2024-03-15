import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import { useConversationContext } from '../context/ConversationContext'
import { v4 as UUID } from 'uuid'

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const {conversations ,setConversations} = useConversationContext()
  const { authUser, setAuthUser } = useAuthContext()

  const getSelfChat = () => {
    console.log("getSelfChat");
    if (authUser && authUser.isOpenSelfChat) {
      const selfChat = {
        id: UUID(),
        fullname: 'Self Chat',
        profilePic: '/save.png',
        isSelfChat: true
      }

      return selfChat
    }
  }

  const getConversations = async () => {
    console.log("getConversations");
    setLoading(true)
    try {
      const selfChat = getSelfChat()
      let res = await fetch('/api/users')
      res = await res.json()

      if (!res.success) throw new Error(res.msg)

      if (selfChat) {
        setConversations([selfChat, ...res?.data] || [selfChat])
      } else {
        setConversations(res?.data || [])
      }
    } catch (error) {
      localStorage.removeItem('chat-user')
      setAuthUser(null)
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
