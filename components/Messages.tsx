import React, { memo } from 'react';

interface MessageProps {
  sender: string;
  username: string;
  text: string;
}

// Using memo to prevent unnecessary re-renders
const Messages = memo(({ sender, username, text }: MessageProps) => {
  const isSystemMessage = sender === "system";
  const isSentMessage = sender === username;
  
  // Choose the appropriate message component based on type
  if (isSystemMessage) {
    return <SystemMessage text={text} />;
  } else if (isSentMessage) {
    return <SentMessage text={text} />;
  } else {
    return <ReceivedMessage sender={sender} text={text} />;
  }
});

// System message component
const SystemMessage = ({ text }: { text: string }) => (
  <div className="my-2 flex justify-center">
    <div className="text-center bg-stone-800/80 text-stone-300 py-1.5 px-3 text-xs rounded-2xl shadow-md">
      <span className="italic text-sm flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        {text}
      </span>
    </div>
  </div>
);

// Sent message component
const SentMessage = ({ text }: { text: string }) => (
  <div className="my-1 transition-all duration-300 ease-out animate-fadeIn">
    <div className="flex justify-end">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-2xl rounded-tr-none max-w-xs md:max-w-sm shadow-md ring-1 ring-blue-400/20 hover:ring-blue-300/30">
        <span className="break-words">{text}</span>
      </div>
    </div>
  </div>
);

// Received message component
const ReceivedMessage = ({ sender, text }: { sender: string, text: string }) => (
  <div className="my-1 transition-all duration-300 ease-out animate-fadeIn">
    <div className="flex justify-start">
      <div className="bg-stone-800 px-4 py-2.5 text-stone-100 rounded-2xl rounded-tl-none max-w-xs md:max-w-sm shadow-md ring-1 ring-white/5 hover:ring-white/10">
        <div className="flex flex-col">
          <span className="font-medium text-blue-300 text-xs mb-1">{sender}</span>
          <span className="break-words">{text}</span>
        </div>
      </div>
    </div>
  </div>
);

Messages.displayName = 'Messages';

export default Messages;