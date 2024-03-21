import { useState } from 'react'
import toast from 'react-hot-toast'
import useConversation from '../zustand/useConversation'

const useCreateConversation = () => {
  const [loading, setLoading] = useState(false)
  const {setSelectedConversation} = useConversation()

  const createConversation = async (partnerId) => {
    setLoading(true)

    try {
      const res = await fetch('/api/v2/conversations/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId: partnerId })
      })
      const jsonRes = await res.json()
      if (!jsonRes.success) {
        throw new Error(jsonRes.msg)
      } else {
        if (jsonRes?.data?.created) {
          toast.success('Create conversation successfully')
        }
        setSelectedConversation(jsonRes?.data?.conversation)
      }
    } catch (error) {
      console.log('Error in createConversation', error)
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { createConversation }
}

export default useCreateConversation
