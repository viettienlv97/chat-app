import { useState } from "react"
import toast from "react-hot-toast"
import useGetConversations from "./useGetConversations"


const useOpenSelfChat = () => {
  const [loading, setLoading] = useState(false)
  //const {setConversations} = useGetConversations()

  const openSelfChat = async (isOpenSelfChat) => {
    setLoading(true)
    try {
      if (!isOpenSelfChat) {
        const res = await fetch(`/api/users/update-self-chat`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({isOpenSelfChat: true})
        })
      }

      const jsonRes = await res.json()
      if (!jsonRes.success) {throw new Error(jsonRes.msg)}

      
    } catch (error) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {loading, openSelfChat}
}

export default useOpenSelfChat
