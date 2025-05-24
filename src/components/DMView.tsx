import React, { useState } from "react";
import TimePassed from "./TimePassed";
import MessageBubble from "./Message";

export interface ThreadMsg {
  id: string;
  content: string;
  sentAt: string;
  senderId: string;
}

export interface Message {
  messageid: string;
  username: string;
  picture: string;
  text: string;
  timestamp: number;
}

interface DMViewProps {
  currentUserId: string;
  thread: ThreadMsg[];
  message: Message;
  onBack: () => void;
  onSend: (content: string) => Promise<void>;
}

const DMView: React.FC<DMViewProps> = ({
  message,
  onBack,
  onSend,
  thread,
  currentUserId,
}) => {
  const [draft, setDraft] = useState("");

  const handleSend = async () => {
    if (!draft.trim()) return;
    await onSend(draft);
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

        <div className="flex flex-col items-center mb-[20px]">
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
        {thread.map((msg) => {
          const isOutbound = msg.senderId === currentUserId;
          const timestamp = new Date(msg.sentAt).getTime();

          return (
            <div
              key={msg.id}
              className={`mb-2 flex flex-col ${
                isOutbound ? "items-end" : "items-start"
              }`}
            >
              <p className="text-[10px] text-gray-500 mb-1">
                <TimePassed timestamp={timestamp} />
              </p>
              <MessageBubble message={msg.content} isSent={isOutbound} />
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="mt-auto py-2 bg-white">
        <div className="relative">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write a message…"
            className="w-full px-4 py-1 pr-10 border rounded-lg focus:outline-none poppins font-regular text-base"
          />
          <button
            onClick={handleSend}
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
