import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  KeyboardEvent,
} from "react";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const textArea = textareaRef.current;
    if (!textArea) return;
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  }, [draft]);

  const handleSend = async () => {
    if (!draft.trim()) return;
    await onSend(draft);
    setDraft("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const view = historyRef.current;
    if (!view) return;
    view.scrollTop = view.scrollHeight;
  }, [thread]);

  const getTimeGroupKey = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (diff < 60000) return "Just now";
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toDateString();
  };

  const groupedMessages = () => {
    const groups: {
      key: string;
      timestamp: number;
      messages: ThreadMsg[];
      isOutbound: boolean;
    }[] = [];

    for (const msg of thread) {
      const date = new Date(msg.sentAt);
      const key = getTimeGroupKey(date);
      const timestamp = date.getTime();
      const isOutbound = msg.senderId === currentUserId;
      const last = groups[groups.length - 1];

      if (last && last.key === key && last.isOutbound === isOutbound) {
        last.messages.push(msg);
      } else {
        groups.push({
          key,
          timestamp,
          messages: [msg],
          isOutbound,
        });
      }
    }

    return groups;
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
      <div ref={historyRef} className="flex-1 overflow-y-auto">
        {groupedMessages().map((group) => (
          <div
            key={group.timestamp + group.key}
            className={`flex flex-col ${
              group.isOutbound ? "items-end" : "items-start"
            } mb-3`}
          >
            <p className="text-[10px] text-gray-500 mb-2px">
              <TimePassed timestamp={group.timestamp} />
            </p>
            {group.messages.map((msg) => {
              return (
                <div key={msg.id} className="mb-1">
                  <MessageBubble
                    message={msg.content}
                    isSent={group.isOutbound}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-auto py-2 bg-white">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message…"
            rows={1}
            maxLength={300}
            className="
              w-full px-4 py-2 pr-10 
              border rounded-lg 
              resize-none 
              focus:outline-none 
              poppins font-regular
              text-base
              min-h-[42px]
              max-h-[150px]
            "
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {draft.length}/300
          </div>
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
