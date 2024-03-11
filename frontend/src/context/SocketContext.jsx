import { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser } = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    console.log(authUser);
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser.id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);

        console.log(onlineUsers);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
