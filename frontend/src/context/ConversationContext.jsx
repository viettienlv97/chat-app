import { createContext, useContext, useState } from "react"

const ConversationContext = createContext()

export const useConversationContext = () => {
    return useContext(ConversationContext)
}

export const ConversationContextProvider = ({children}) => {
    const [conversations, setConversations] = useState([])

    return (
        <ConversationContext.Provider value={{conversations, setConversations}}>
            {children}
        </ConversationContext.Provider>
    )
}