import React from 'react'
import useConversation from '../../zustand/useConversation'
import useCreateConversation from '../../hooks/useCreateConversation'

const FriendSearch = ({ friend, lastIndex }) => {
  const { setFriendsList } = useConversation()
  const {loading, createConversation} = useCreateConversation()

  const handleSelectFriend = async () => {
    if (!loading) {
      // TODO
      // create conversation with this friend
      console.log(friend.id)
      await createConversation(friend.id)
    }
    setFriendsList([])
  }

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer select-none
        `}
        onClick={handleSelectFriend}
      >
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            <img src={friend?.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{friend?.fullname}</p>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  )
}

export default FriendSearch
