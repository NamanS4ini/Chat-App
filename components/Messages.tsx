import React from 'react'

const Messages = ({ sender, username, text }: { sender: string, username: string, text: string }) => {
  const isSystemMessage = sender === "system";
  const isSentMessage = sender === username;

  return (
    <div className={`transition-all duration-300 ease-out animate-fadeIn ${isSystemMessage ? "my-2" : "my-1"}`}>
      <div className={`flex 
        ${isSystemMessage ? "justify-center" :
          isSentMessage ? "justify-end" : "justify-start"}`}
      >
        <div className={`rounded-2xl max-w-xs md:max-w-sm shadow-md
          ${isSystemMessage 
            ? "text-center bg-stone-800/80 text-stone-300 py-1.5 px-3 text-xs" 
            : isSentMessage 
              ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-tr-none" 
              : "bg-stone-800 px-4 py-2.5 text-stone-100 rounded-tl-none"}`}
        >
          {isSystemMessage ? (
            <span className="italic text-sm flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {text}
            </span>
          ) : isSentMessage ? (
            <span className="break-words">{text}</span>
          ) : (
            <div>
              <div className="flex flex-col">
                <span className="font-medium text-blue-300 text-xs mb-1">{sender}</span>
                <span className="break-words">{text}</span>
              </div>
            </div>
          )}</div>
        </div>
      </div>
  )
}

export default Messages;