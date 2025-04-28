import { useState, useEffect } from "react";
import MessagePreview from "./MessagePreview";
import { Message } from "./DMView";

export interface MenuProps {
  onSelectMessage: (msg: Message) => void;
}

const mockMessages = [
  {
    messageid: "1",
    username: "Bob Johnson",
    picture: "/pfp_img-placeholder.jpg",
    text: "I have a question about a specific tee time.",
    timestamp: Date.now() - 5 * 60_000, // 5 minutes ago
  },
  {
    messageid: "2",
    username: "Buddy Holly",
    picture: "/pfp_img-placeholder.jpg",
    text: "I know this is last minute but my friends and I are hoping to play today! Are there any spots available?",
    timestamp: Date.now() - 2 * 60 * 60_000, // 2 hours ago
  },
  // …etc
];

const mockEvents = [
  { id: "e1", title: "Event One" },
  // …etc
];

function Menu({ onSelectMessage }: MenuProps) {
  const [tab, setTab] = useState("messages");
  const [messagesTabStyle, setMessagesTabStyle] = useState(
    "text-[#959494] border-b border-b-[#959494]"
  );
  const [eventsTabStyle, setEventsTabStyle] = useState(
    "text-[#959494] border-b border-b-[#959494]"
  );

  useEffect(() => {
    if (tab === "messages") {
      setMessagesTabStyle("text-black border-b-2 border-b-black");
    } else {
      setEventsTabStyle("text-black border-b-2 border-b-black");
    }
  }, [tab]);

  return (
    <div>
      <div className="flex justify-center items-center mt-[30px] font-poppins font-medium text-base">
        <button
          className={`w-[152px] ${eventsTabStyle} py-[10px]`}
          onClick={() => setTab("events")}
        >
          Events ({mockEvents.length})
        </button>
        <button
          className={`w-[152px] ${messagesTabStyle} py-[10px]`}
          onClick={() => setTab("messages")}
        >
          Messages ({mockMessages.length})
        </button>
      </div>

      {tab === "messages" ? (
        <ul className="flex flex-col items-center w-[304px] mt-[16px]">
          {mockMessages.map((msg) => (
            <li
              key={msg.messageid}
              className="mb-[12px] mx-[16px] cursor-pointer"
              onClick={() => onSelectMessage(msg)}
            >
              <MessagePreview message={msg} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col items-center w-[304px] mt-[16px]">
          {mockEvents.map((ev) => (
            <li key={ev.id} className="mb-[12px] mx-[16px]">
              {ev.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Menu;
