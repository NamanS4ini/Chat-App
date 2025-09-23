"use client";
import { useEffect, useState, useCallback } from "react";
import { socket } from "@/lib/socketClient";
import LoginForm from "@/components/LoginForm";
import ChatRoom from "@/components/ChatRoom";


export default function Home() {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [roomId, setRoomId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");

  // Handle sending messages - memoized to prevent unnecessary re-renders
  const onSendMessage = useCallback((message: string) => {
    if (message.trim() === "") {
      alert("Message cannot be empty.");
      return;
    }
    socket.emit("message", { room: roomId, message, sender: username });
    setMessages((prevMessages) => [...prevMessages, { sender: username, text: message }]);
  }, [roomId, username]);

  // Handle joining room - memoized to prevent unnecessary re-renders
  const handleJoinRoom = useCallback((username: string, roomId: string) => {
    if (username.trim() === "" || roomId.trim() === "" || username.trim() === "you") {
      alert("Please enter valid username and room ID.");
      return;
    }
    
    socket.emit("join-room", { room: roomId, username });
    setUsername(username);
    setRoomId(roomId);
    setIsConnected(true);
  }, []);

  // Socket event listeners
  useEffect(() => {
    const messageHandler = (message: { sender: string, text: string }) => {
      setMessages(prev => [...prev, message]);
    };

    const systemMessageHandler = (message: string) => {
      setMessages(prev => [...prev, { sender: "system", text: message }]);
    };

    // Set up socket listeners
    socket.on("message", messageHandler);
    socket.on("user-joined", systemMessageHandler);
    socket.on("user-left", systemMessageHandler);

    // Cleanup listeners
    return () => {
      socket.off("message", messageHandler);
      socket.off("user-joined", systemMessageHandler);
      socket.off("user-left", systemMessageHandler);
    };
  }, []);


  return (
    <div className="w-full min-h-[100vh]">
      {!isConnected ? (
        <LoginForm onJoinRoom={handleJoinRoom} />
      ) : (
        <ChatRoom 
          messages={messages}
          username={username}
          roomId={roomId}
          onSendMessage={onSendMessage}
        />
      )}
    </div>
  );
}