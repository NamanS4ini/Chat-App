"use client";
import ChatForm from "../components/ChatForm";
import Messages from "../components/Messages";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";


export default function Home() {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [roomId, setRoomId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");
  const onSendMessage = (message: string) => {
    // console.log("Message sent:", message);
    if (message.trim() === "") {
      alert("Message cannot be empty.");
      return;
    }
    console.log({ room: roomId, message, sender: username });
    //* Emit message event to the server
    socket.emit("message", { room: roomId, message, sender: username });
    setMessages((prevMessages) => [...prevMessages, { sender: username, text: message }]);
  }

  const handleJoinRoom = () => {
    if (username.trim() === "" || roomId.trim() === "" || username.trim() === "you") {
      alert("Please enter valid username and room ID.");
      return;
    }
    //* Emit join-room event to the server
    if (username && roomId) {
      socket.emit("join-room", { room: roomId, username });
      setIsConnected(true);
    }
  };

  useEffect(() => {
    //* Listen for messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("user-joined", (message) => {
      setMessages((prevMessages) => [...prevMessages, { sender: "system", text: message }]);
    });
    socket.on("user-left", (message) => {
      setMessages((prevMessages) => [...prevMessages, { sender: "system", text: message }]);
    });

    return () => {
      socket.off("message");
      socket.off("user-joined");
      socket.off("user-left");
    };
  }, []);


  return (
    <div>
      {!isConnected ?
        <div className="flex flex-col items-center justify-center min-h-[100svh] bg-gradient-to-br md:stone-800  text-white md:px-4">
          <div className="bg-stone-950 rounded-xl shadow-xl p-8 w-full max-w-sm border border-stone-800">
            <h2 className="text-2xl font-bold mb-6 text-center">Join a Chat Room</h2>
            <input
              className="mb-3 p-3 border border-stone-700 bg-stone-900 rounded-lg w-full text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
            <input
              className="mb-5 p-3 border border-stone-700 bg-stone-900 rounded-lg w-full text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
            />
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition disabled:bg-stone-700 disabled:cursor-not-allowed"
              disabled={!username || !roomId}
              onClick={handleJoinRoom}
            >
              Join Room
            </button>
          </div>
        </div>

        : 
        <div className="flex flex-col md:h-[80vh] h-[100dvh] md:max-h-[700px] md:max-w-4xl mx-auto my-0 md:my-12 bg-stone-900 shadow-2xl md:rounded-xl overflow-hidden border border-stone-800">
          <div className="bg-blue-700 p-5 text-white text-xl font-bold flex items-center justify-between">
            <span>
              Room: <span className="font-mono">{roomId}</span>
            </span>
            <span className="text-sm font-normal opacity-80">User: <span className="font-bold">{username}</span></span>
          </div>
          <div className="flex-1 bg-stone-950 p-4 overflow-y-auto space-y-3 custom-scrollbar">
            {messages.map((msg, index) => (
              <Messages key={index} sender={msg.sender} username={username} text={msg.text} />
            ))}
          </div>
          <div className="bg-stone-900 p-3 border-t border-stone-800">
            <ChatForm onSendMessage={onSendMessage} />
          </div>
        </div>}
    </div>
  );
}