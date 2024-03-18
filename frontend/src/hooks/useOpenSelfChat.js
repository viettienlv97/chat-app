import { useState } from "react"
import toast from "react-hot-toast"

const useOpenSelfChat = () => {
  const [loading, setLoading] = useState(false)

  const openSelfChat = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/v2/users/open-selfchat`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: 'selfchat'})
      })

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
