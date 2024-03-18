import { useEffect } from 'react'
import Conversation from './Conversation'
import { getRandomEmoji } from '../../utils/emojis'
import { useSocketContext } from '../../context/SocketContext'
import { useConversationContext } from '../../context/ConversationContext'
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../hooks/useGetConversations'
import { useAuthContext } from '../../context/AuthContext'

const Conversations = () => {
  const { loading, getConversations } = useGetConversations()
  const { friendsList, setFriendsList } = useConversation()
  const { conversations } = useConversationContext()
  const { onlineUsers } = useSocketContext()
  const { authUser } = useAuthContext()

  useEffect(() => {
    console.log('Re-render')
    console.log('conversations', conversations)
    console.log('authUser.selfchat', authUser?.isOpenSelfChat || null)
    return () => {}
  }, [friendsList, onlineUsers])

  useEffect(() => {
    getConversations()
    // return () => {}
  }, [authUser?.isOpenSelfChat])

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {friendsList && friendsList.length ? (
        <h1 className=" font-bold pl-2 self-start">Search</h1>
      ) : null}
      {friendsList.map((friend, idx) => (
        <Conversation
          key={friend.id}
          conversation={friend}
          lastIndex={idx === friendsList.length - 1}
        />
      ))}
      {conversations && conversations.length ? (
        <h1 className=" font-bold pl-2 self-start">Chat</h1>
      ) : null}
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  )
}

export default Conversations
