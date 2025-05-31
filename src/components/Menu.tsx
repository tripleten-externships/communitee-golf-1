import MessagePreview from "./MessagePreview";

export interface Message {
  id: string;
  clientName: string;
  clientImage: string;
  unreadCount: number;
  lastMessageAt: number;
  lastMessage: string;
  locationId: string;
}

export interface Location {
  id: string;
  name: string;
}

export interface MenuProps {
  messagesArray?: Message[];
  onSelect: (message: Message) => void;
}

const Menu: React.FC<MenuProps> = ({ messagesArray, onSelect }) => {
  return (
    <div>
      <p className="font-poppins font-medium text-center text-base w-[152px] text-black border-b-2 border-b-black mt-[30px] mx-auto py-[10px]">
        Messages {messagesArray?.length ? `(${messagesArray.length})` : "(0)"}
      </p>
      <ul className="flex flex-col justify-center mt-[16px] gap-[12px]">
        {messagesArray?.map((message) => (
          <li
            key={`${message.clientName}-${message.locationId}`}
            onClick={() => onSelect(message)}
          >
            <MessagePreview
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
