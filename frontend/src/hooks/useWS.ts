import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useWS = (url?: string) => {
  const DEFAULT_URL = url || '';
  const [socket, setSocket] = useState<Socket>();

  const wsConnect = () => {
    console.log('WS Connect');
  };

  const wsDisconnet = () => {
    console.log('Disconnected from the server');
  }

  useEffect(() => {
    // Create a new socket connection when the component mounts
    const newSocket = io(DEFAULT_URL);

    // Set up event listeners or any other initialization logic here
    newSocket.on('connect', wsConnect);

    newSocket.on('disconnect', wsDisconnet);

    // Set the socket state
    setSocket(newSocket);

    // Clean up the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };

  }, [url]);

  return socket;
}

export default useWS;