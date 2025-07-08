import React from 'react'

const Messages = ({ sender, username, text }: { sender: string, username: string, text: string }) => {
  const isSystemMessage = sender === "system";
  const isSentMessage = sender === username;

  return (
    <div>
      <div className={`flex 
        ${isSystemMessage ? "justify-center" :
          isSentMessage ? "justify-end px-4 py-2" : "justify-start px-4 py-2"}`}
      >

        <div className={` rounded-lg max-w-xs 
          ${isSystemMessage ? "text-center bg-stone-600 text-white py-1 px-2" :
            isSentMessage ? "bg-blue-600 text-white px-4 py-2" : "bg-gray-200 px-4 py-2"}`}
        >

          {isSystemMessage ? (
            <span className="italic text-sm">{text}</span>
          ) : isSentMessage ? (
            <span className="break-words">{text}</span>
          ) : (
            <span>
                <span className="flex items-baseline">
                  <span className="font-semibold text-blue-700 mr-2">{sender}:</span>
                  <span className="break-words">{text}</span>
                </span>
            </span>
          )}</div>
        </div>
      </div>
  )
}

export default Messages;