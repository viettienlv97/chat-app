import { useState } from 'react'
import toast from 'react-hot-toast'
import useConversation from '../zustand/useConversation'

const useSearchFriends = () => {
  const [loading, setLoading] = useState(false)
  const {friendsList, setFriendsList} = useConversation()

  const searchFriends = async (searchInput) => {
    setLoading(true)

    try {
      const res = await fetch(`/api/v2/users/?search=${searchInput}`)
      const jsonRes = await res.json()
      if (!jsonRes.success) throw new Error(jsonRes.msg)

      console.log(jsonRes.data)
      setFriendsList(jsonRes.data)

      console.log(friendsList);

    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, searchFriends }
}

export default useSearchFriends
