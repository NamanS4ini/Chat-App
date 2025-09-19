"use client";
import ChatForm from "../components/ChatForm";
import Messages from "../components/Messages";
import { useEffect, useState, useRef } from "react";
import { socket } from "@/lib/socketClient";


export default function Home() {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [roomId, setRoomId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSendMessage = (message: string) => {
    if (message.trim() === "") {
      alert("Message cannot be empty.");
      return;
    }
    console.log({ room: roomId, message, sender: username });
    socket.emit("message", { room: roomId, message, sender: username });
    setMessages((prevMessages) => [...prevMessages, { sender: username, text: message }]);
  }

  const handleJoinRoom = () => {
    if (username.trim() === "" || roomId.trim() === "" || username.trim() === "you") {
      alert("Please enter valid username and room ID.");
      return;
    }
    if (username && roomId) {
      socket.emit("join-room", { room: roomId, username });
      setIsConnected(true);
    }
  };

  useEffect(() => {
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
    <div className="w-full min-h-[100vh]">
      {!isConnected ? (
        <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 w-full">
          <div className="bg-stone-900/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-stone-700/50 animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Join Chat Room</h2>
            <input
              className="mb-4 p-4 border border-stone-700/50 bg-stone-800/50 rounded-xl w-full text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
            />
            <input
              className="mb-6 p-4 border border-stone-700/50 bg-stone-800/50 rounded-xl w-full text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
            />
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!username || !roomId}
              onClick={handleJoinRoom}
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh] flex justify-center">
          <div className="w-full h-full lg:h-[95vh] lg:max-w-7xl lg:my-auto lg:mx-6 xl:mx-auto lg:rounded-2xl flex flex-col bg-stone-900/90 backdrop-blur-md shadow-2xl overflow-hidden border border-stone-700/50">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-600 p-4 md:p-5 text-white font-bold flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm10 4a1 1 0 100 2 1 1 0 000-2z"/>
                </svg>
                <span className="text-lg md:text-xl truncate">
                  Room: <span className="font-mono bg-blue-900/50 px-2 py-1 rounded-md text-blue-100">{roomId}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-800/50 px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span>{username}</span>
              </div>
            </div>
            <div className="flex-1 bg-stone-950 p-4 overflow-y-auto space-y-3 custom-scrollbar">
              {messages.map((msg, index) => (
                <Messages key={index} sender={msg.sender} username={username} text={msg.text} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="bg-stone-900 border-t border-stone-800/50">
              <ChatForm onSendMessage={onSendMessage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}