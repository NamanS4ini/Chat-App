"use client";
import { useRef, useEffect, memo, useState } from "react";
import Messages from "./Messages";
import ChatForm from "./ChatForm";

interface ChatRoomProps {
  messages: { sender: string; text: string }[];
  username: string;
  roomId: string;
  onSendMessage: (message: string) => void;
}

const ChatRoom = ({ messages, username, roomId, onSendMessage }: ChatRoomProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full h-[100vh] flex justify-center">
      <div className="w-full h-full lg:h-[95vh] lg:max-w-7xl lg:my-auto lg:mx-6 xl:mx-auto lg:rounded-2xl flex flex-col bg-stone-900/90 backdrop-blur-md shadow-2xl overflow-hidden border border-stone-700/50">
        <ChatHeader username={username} roomId={roomId} />
        
        <div className="flex-1 bg-stone-950 bg-dot-grid p-4 overflow-y-auto space-y-3 custom-scrollbar">
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
  );
};

// Memoized header component to prevent unnecessary re-renders
const ChatHeader = memo(({ username, roomId }: { username: string; roomId: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-600 p-4 md:p-5 text-white font-bold flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm10 4a1 1 0 100 2 1 1 0 000-2z"/>
        </svg>
        <span className="text-lg md:text-xl truncate">
          Room: <span className="font-mono bg-blue-900/50 px-2 py-1 rounded-md text-blue-100">{roomId}</span>
        </span>
        <button
          onClick={handleCopy}
          title="Copy Room ID"
          className="ml-1 inline-flex items-center justify-center rounded-md bg-blue-900/40 hover:bg-blue-900/60 transition-colors px-2 py-1 text-xs font-semibold border border-blue-300/20"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V8a2 2 0 00-2-2h-6l-2-2H6a2 2 0 00-2 2v2" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex items-center gap-2 bg-blue-800/50 px-3 py-1 rounded-full text-sm">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <span>{username}</span>
      </div>
    </div>
  );
});

ChatHeader.displayName = "ChatHeader";

export default ChatRoom;
