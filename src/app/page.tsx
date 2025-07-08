"use client";
import ChatForm from "@/components/ChatForm";
import Messages from "@/components/Messages";
import { useState } from "react";

const messagesData = [
  {sender: "system", text: "alice joined the room"},
  { sender: "Alice", text: "Hello, how are you?" },
  { sender: "you", text: "I'm good, thanks! How about you?" },
  { sender: "Alice", text: "Doing well, just working on a project." },
  { sender: "you", text: "Sounds interesting! What kind of project?" },
  { sender: "Alice", text: "It's a chat application using React." },
  { sender: "you", text: "Nice! I love building chat apps." },
];

export default function Home() {
  const [messages, setMessages] = useState<{sender: string, text: string}[]>(messagesData);
  const [roomId, setRoomId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");
  const onSendMessage = (message: string) => {
    console.log("Message sent:", message);
  }

  const handleJoinRoom = () => {
    if(username.trim() === "" || roomId.trim() === "" || username.trim() === "you") {
      alert("Please enter valid username and room ID.");
      return;
    }
    if (username && roomId) {
      setIsConnected(true);
    }
  };

  return (
    <div>
      {!isConnected ? 
      <div className="flex flex-col items-center justify-center h-screen bg-stone-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Join a Chat Room</h2>
        <input
          className="mb-2 p-2 border border-stone-700 bg-stone-800 rounded w-64 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="mb-4 p-2 border border-stone-700 bg-stone-800 rounded w-64 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-stone-700"
          disabled={!username || !roomId}
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
      </div>
      
      : <div className="flex flex-col h-[calc(100vh-4rem)] m-4 mx-auto bg-black shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 p-4 text-white text-lg font-semibold">RoomId: {roomId}</div>
        <div className="flex-1 bg-stone-900 p-4 overflow-y-auto space-y-2">
          {/* Example messages */}
          {messages.map((msg, index) => (
            <Messages key={index} sender={msg.sender} text={msg.text} />
          ))}
        </div>
        <ChatForm onSendMessage={onSendMessage} />
      </div>}
    </div>
  );
}