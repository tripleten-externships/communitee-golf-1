// src/components/DMView.tsx
import React, { useState } from "react";
import TimePassed from "./TimePassed";

export interface Message {
  messageid: string;
  username: string;
  picture: string;
  text: string;
  timestamp: number;
}

interface DMViewProps {
  message: Message;
  onBack: () => void;
}

const DMView: React.FC<DMViewProps> = ({ message, onBack }) => {
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    // TODO: wire up your send handler
    console.log("send", draft);
    setDraft("");
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden pb-10">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="">
          <img
            src="/icons/back-btn.svg"
            alt="Back"
            className="w-6 h-6 object-contain"
          />
        </button>

        <div className="flex flex-col items-center">
          <img
            src={message.picture}
            alt={`${message.username}'s avatar`}
            className="w-[36px] h-[36px] rounded-full"
          />
          <span className="text-base poppins font-medium">
            {message.username}
          </span>
        </div>
        <div className="w-6" />
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto">
        <div className="mb-6">
          <p className="text-[10px] text-gray-500 mb-1">
            <TimePassed timestamp={message.timestamp} />
          </p>
          <div className="inline-block bg-gray-100 rounded-xl px-4 py-2 mr-10 text-sm">
            {message.text}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="mt-auto py-2 bg-white">
        <div className="relative">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Write a message…"
            className="w-full px-4 py-1 border rounded-lg focus:outline-none poppins font-regular text-base"
          />
          <button
            onClick={sendMessage}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <img
              src="/icons/send.svg"
              alt="Send"
              className="w-5 h-5 object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DMView;
