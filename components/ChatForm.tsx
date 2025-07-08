"use client";
import React, { useState } from 'react'

const ChatForm = ({ onSendMessage }: { onSendMessage: (message: string) => void }) => {
  const [message, setMessage] = useState("");



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return; // Prevent sending empty messages
    onSendMessage(message);
    setMessage(""); // Clear the input after sending
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 bg-gradient-to-r bg-stone-900 border-t border-stone-700 shadow-lg">
      <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type your message..."
      className="flex-1 rounded-l-xl px-4 py-2 bg-stone-100/80 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-inner"
      />
      <button
      type="submit"
      className="bg-gradient-to-br from-blue-600 to-blue-400 text-white px-6 py-2 rounded-r-xl font-semibold shadow-md hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all duration-150 active:scale-95"
      >
      <span className="hidden sm:inline">Send</span>
      <svg className="inline-block sm:hidden w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      </button>
    </form>
  )
}

export default ChatForm