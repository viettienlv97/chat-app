import { useRef } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useOpenSelfChat from '../../hooks/useOpenSelfChat'
import { useConversationContext } from '../../context/ConversationContext'
import useConversation from '../../zustand/useConversation'

const MenuDropdown = () => {
  const detail = useRef()
  const { authUser } = useAuthContext()
  const { loading, openSelfChat } = useOpenSelfChat()
  const { conversations } = useConversationContext()
  const {setSelectedConversation} = useConversation()

  const handleOpenSelfChat = async () => {
    if (authUser && !authUser.isOpenSelfChat) {
      await openSelfChat()
    } else {
      const selfChatConversation = conversations.find(c => c.isSelfChat)
      if (selfChatConversation) setSelectedConversation(selfChatConversation)
    }
    closeDropdown()
  }

  const closeDropdown = () => {
    detail.current.open = false
  }

  return (
    <div>
      <details className="dropdown w-full" ref={detail}>
        <summary
          className={`btn w-full bg-transparent border-none pb-4 text-3xl`}
        >
          ...
        </summary>
        <ul className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40">
          <li>
            <a onClick={handleOpenSelfChat}>Saved Messages</a>
          </li>
          <li>
            <a onClick={closeDropdown}>Contact</a>
          </li>
          <li>
            <a onClick={closeDropdown}>Setting</a>
          </li>
          {/* <li>
            <a>Dark Mode</a>
          </li> */}

          {/* <li className="">
            <a>Report</a>
          </li> */}
        </ul>
      </details>
    </div>
  )
}

export default MenuDropdown
