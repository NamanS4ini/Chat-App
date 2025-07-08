import React from 'react'

const Messages = ({ sender, text }: { sender: string, text: string }) => {
  const isSystemMessage = sender === "system";
  const isSentMessage = sender === "you";

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

          {!isSystemMessage && !isSentMessage ?  <span> <span className='font-semibold'>{`${sender}: `}</span>{`${text}`}</span> :
            isSystemMessage ? `${text}` : `${text}`}
        </div>
      </div>
    </div>
  )
}

export default Messages;