import React from "react";
import MessagePreview from "./MessagePreview";

interface Message {
    clientName: string;
    clientImage: string;
    unreadCount: number;
    lastMessageAt: number;
    lastMessage: string;
}
interface MenuProps {
    messagesData: Message[];
}
const Menu: React.FC<MenuProps> = ({ messagesData }) => {
    return(
        <div>
            <p className = {`font-poppins font-medium text-center text-base w-[152px] text-black border-b-2 border-b-black mt-[30px] mx-[auto] py-[10px]`}>Messages ({messagesData.length})</p>
            <ul className="flex flex-col justify-center items-center mt-[16px] gap-[12px]">
                {messagesData.map((message, index) => (
                    <MessagePreview 
                        key={index}
                        previewProps={{
                            clientName:message.clientName,
                            clientImage:message.clientImage,
                            unreadCount:message.unreadCount,
                            lastMessageAt:message.lastMessageAt,
                            lastMessage:message.lastMessage
                        }}
                        
                    />
                ))}
            </ul>
        </div>
 
    )
}

export default Menu;