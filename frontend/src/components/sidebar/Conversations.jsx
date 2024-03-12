import React, { useEffect } from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'
import { useSocketContext } from '../../context/SocketContext'

const Conversations = () => {
  const {loading, conversations, getConversations} = useGetConversations()
  const {onlineUsers} = useSocketContext()

  useEffect(() => {
    getConversations()

    return () => {}
  }, [onlineUsers])

  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {conversations.map((conversation, idx) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIndex={idx === (conversations.length - 1)}
          />
        ))}

        {loading ? <span className='loading loading-spinner mx-auto'></span> : null}

    </div>
  )
}

export default Conversations