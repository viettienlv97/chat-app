import { useAuthContext } from '../../context/AuthContext'
import useOpenSelfChat from '../../hooks/useOpenSelfChat'

const MenuDropdown = () => {
  const { authUser } = useAuthContext()
  const { loading, openSelfChat } = useOpenSelfChat()

  const handleOpenSelfChat = async () => {
    if (authUser && !authUser.isOpenSelfChat) {
      await openSelfChat()
    }
  }

  return (
    <div>
      <details className="dropdown w-full">
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
            <a>Contact</a>
          </li>
          <li>
            <a>Setting</a>
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
