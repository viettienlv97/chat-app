import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation, setFriendsList } =
    useConversation()

  const isSelected = selectedConversation?.id === conversation.id
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(conversation.partner?.id)

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer select-none
            ${isSelected ? 'bg-sky-500' : ''}
        `}
        onClick={() => {
          //setSelectedConversation(conversation)
          setFriendsList([])
        }}
      >
        <div className={`avatar ${isOnline && 'online'}`}>
          <div className="w-12 rounded-full">
            <img src={!conversation.isSelfChat ? conversation.partner?.profilePic : './save.png'} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {!conversation.isSelfChat
                ? conversation.partner?.fullname
                : 'Self Chat'}
            </p>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  )
}

export default Conversation
