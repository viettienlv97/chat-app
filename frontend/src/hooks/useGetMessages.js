import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        let res = await fetch(`/api/messages/${selectedConversation.id}`);
        res = await res.json();

        console.log("res", res.data);

        if (!res.success) {
          throw new Error(res.msg);
        }
        setMessages(res.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?.id) getMessages();
  }, [selectedConversation?.id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
