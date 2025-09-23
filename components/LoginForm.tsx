"use client";
import { useState } from "react";

interface LoginFormProps {
  onJoinRoom: (username: string, roomId: string) => void;
}

const LoginForm = ({ onJoinRoom }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoinRoom(username, roomId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 w-full">
      <div className="bg-stone-900/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-stone-700/50 ring-1 ring-white/10 animate-fadeIn">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Join Chat Room</h2>
        <form onSubmit={handleSubmit}>
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
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            disabled={!username || !roomId}
          >
            Join Room
          </button>
        </form>
        <p className="mt-4 text-sm text-stone-400 text-center">
          Tip: Share the Room ID with a friend to start chatting.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
