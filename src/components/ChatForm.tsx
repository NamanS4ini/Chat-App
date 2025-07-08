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
    <form onSubmit={handleSubmit} className="flex p-4 bg-stone-800 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-l-lg px-4 py-2 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition"
      >
        Send
      </button>
    </form>
  )
}

export default ChatForm