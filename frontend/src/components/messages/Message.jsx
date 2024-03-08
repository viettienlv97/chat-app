import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full '>
                <img src="https://avatar.iran.liara.run/public/boy?userName=viettienvu" alt="" />
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500`}>Hi! What's up!</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>Seen at 12:46</div>
    </div>
  )
}

export default Message