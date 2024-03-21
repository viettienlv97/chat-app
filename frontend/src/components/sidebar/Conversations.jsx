import { useEffect } from 'react'
import Conversation from './Conversation'
import FriendSearch from './FriendSearch'
import { getRandomEmoji } from '../../utils/emojis'
import { useSocketContext } from '../../context/SocketContext'
import { useConversationContext } from '../../context/ConversationContext'
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../hooks/useGetConversations'
import { useAuthContext } from '../../context/AuthContext'

const Conversations = () => {
  const { loading, getConversations } = useGetConversations()
  const { friendsList, setFriendsList } = useConversation()
  const { conversations, setConversations } = useConversationContext()
  const { onlineUsers } = useSocketContext()
  const { authUser } = useAuthContext()

  useEffect(() => {
    getConversations()
    return () => {
      setConversations([])
    }
  }, [authUser?.isOpenSelfChat, friendsList])

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {friendsList && friendsList.length ? (
        <h1 className=" font-bold pl-2 self-start">Search</h1>
      ) : null}
      {friendsList.map((friend, idx) => (
        <FriendSearch
          key={friend.id}
          friend={friend}
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
