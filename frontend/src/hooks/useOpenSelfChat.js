import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useOpenSelfChat = () => {
  const [loading, setLoading] = useState(false)
  const { authUser, setAuthUser } = useAuthContext()

  const openSelfChat = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/v2/users/open-selfchat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'selfchat' })
      })

      const jsonRes = await res.json()
      console.log('jsonRes', jsonRes)
      setAuthUser({
        ...authUser,
        isOpenSelfChat: true
      })
      console.log(authUser)
      if (!jsonRes.success) {
        throw new Error(jsonRes.msg)
      }
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, openSelfChat }
}

export default useOpenSelfChat
