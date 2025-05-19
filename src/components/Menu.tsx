import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/useAuth";
import { getMessageStreams } from "./utils/api";
import MessagePreview from "./MessagePreview";

export interface Message {
  id: string;
  clientName: string;
  clientImage: string;
  unreadCount: number;
  lastMessageAt: string;
  lastMessage: string;
  locationId: string;
}

export interface Location {
  id: string;
  name: string;
}

export interface MenuProps {
  selected: string | null;
  locations: Location[];
  messagesArray?: Message[];
  onSelect: (message: Message) => void;
}

const Menu: React.FC<MenuProps> = ({
  selected,
  locations,
  messagesArray,
  onSelect,
}) => {
  const { token } = useAuth();
  const [locationId, setLocationId] = useState<string>("0");
  const [messagesData, setMessagesData] = useState<Message[]>(
    messagesArray ?? []
  );
  const shouldFetch = messagesArray === undefined;

  useEffect(() => {
    if (messagesArray !== undefined) {
      setMessagesData(messagesArray);
    }
  }, [messagesArray]);

  useEffect(() => {
    if (!shouldFetch || !selected) return;
    const found = locations.find((loc) => loc.name === selected);
    setLocationId(found ? found.id : "");
  }, [selected, locations, shouldFetch]);

  useEffect(() => {
    if (!token || !shouldFetch || !locationId) return;
    getMessageStreams(token, locationId)
      .then((data) => setMessagesData(data))
      .catch((err) => console.error("Cannot fetch message streams:", err));
  }, [token, shouldFetch, locationId]);

  return (
    <div>
      <p className="font-poppins font-medium text-center text-base w-[152px] text-black border-b-2 border-b-black mt-[30px] mx-auto py-[10px]">
        Messages ({messagesData.length})
      </p>
      <ul className="flex flex-col justify-center items-center mt-[16px] gap-[12px]">
        {messagesData.map((message) => (
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
