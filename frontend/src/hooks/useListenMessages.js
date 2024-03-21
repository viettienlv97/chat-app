import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import Sound from '../assets/sound.mp3'
import { useConversationContext } from '../context/ConversationContext'

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useConversation()
  const { conversations } = useConversationContext()

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      console.log('newMessage', newMessage)
      newMessage.shouldShake = true
      setMessages([...messages, newMessage])
    })
    return () => socket?.off('newMessage')
  }, [socket, setMessages, messages])

  useEffect(() => {
    socket?.on('notifyMessage', (notify) => {
      console.log('notifyMessage', notify)
      //conversations

      const sound = new Audio(Sound)
      sound.play()
    })

    return () => socket?.off('notifyMessage')
  }, [socket, setMessages, messages])
}

export default useListenMessages
