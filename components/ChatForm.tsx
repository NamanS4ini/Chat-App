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
    <form onSubmit={handleSubmit} className="flex items-center p-3 bg-stone-900 shadow-lg">
      <div className="relative flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full rounded-l-xl px-4 py-3 bg-stone-800/80 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 border border-stone-700/30"
        />
        {message.length === 0 && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <button
        type="submit"
        disabled={message.trim() === ""}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-r-xl font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-150 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
      >
        <span className="hidden sm:inline">Send</span>
        <svg className="inline-block sm:hidden w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  )
}

export default ChatForm