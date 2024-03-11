import React from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log(messages);
  return (
    <div className="px-4 flex-1 overflow-auto ">
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}

      {!loading && messages.length && messages.map((message, idx) => (<Message message={message} key={idx} />))}
    </div>
  );
};

export default Messages;
