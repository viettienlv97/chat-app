import React, { useState } from "react";
import {IoSearchSharp} from 'react-icons/io5'
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import MenuDropdown from "./MenuDropdown";
import { useConversationContext } from "../../context/ConversationContext";

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const {setSelectedConversation} = useConversation()
  
  const {conversations} = useConversationContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) return toast.error('Search term must be at least 3 characters long')

    const conversation = conversations.find(c => c.fullname.toLowerCase().includes(search.toLowerCase()))

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch('')
    } else toast.error('No such user found!')
  }

  return (
    <form className="flex items-center gap-2"
      onSubmit={handleSubmit}
    >
      <MenuDropdown />
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered rounded-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white absolute right-0">
          <IoSearchSharp className="w-6 h-6 outline-none"/>
        </button>
      </div>
      
      
    </form>
  );
};

export default SearchInput;
