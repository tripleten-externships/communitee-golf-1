import React from "react";
import MessagePreview from "./MessagePreview";

export interface Message {
  id: string;
  clientName: string;
  clientImage: string;
  unreadCount: number;
  lastMessageAt: string;
  lastMessage: string;
}
interface MenuProps {
  messagesData: Message[];
  onSelect: (message: Message) => void;
}
const Menu: React.FC<MenuProps> = ({ messagesData, onSelect }) => {
  return (
    <div>
      <p
        className={`font-poppins font-medium text-center text-base w-[152px] text-black border-b-2 border-b-black mt-[30px] mx-[auto] py-[10px]`}
      >
        Messages ({messagesData.length})
      </p>
      <ul className="flex flex-col justify-center items-center mt-[16px] gap-[12px]">
        {messagesData.map((message, index) => (
          <li key={index} onClick={() => onSelect(message)}>
            <MessagePreview
              key={index}
              previewProps={{
                clientName: message.clientName,
                clientImage: message.clientImage,
                unreadCount: message.unreadCount,
                lastMessageAt: message.lastMessageAt,
                lastMessage: message.lastMessage,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
