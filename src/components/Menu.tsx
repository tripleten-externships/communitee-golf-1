import React, {useState, useEffect} from "react";

import {
    getMessageStreams,
  } from "./utils/api.tsx";

import MessagePreview from "./MessagePreview";
import {AUTH_TOKEN_KEY} from "./LoginForm.tsx"

interface Message {
    clientName: string;
    clientImage: string;
    unreadCount: number;
    lastMessageAt: number;
    lastMessage: string;
    locationId: string;
}
interface MenuProps {
    selected: string | null;
}

export const Menu: React.FC<MenuProps> = ({ selected }) => {
    const [locationId, setLocationId] = useState("0");
    const [messagesData, setMessagesData] = useState<Message[]>([]);
    // setting locationId
    useEffect(()=>{
        if(selected==="Golf Course one"){
        setLocationId("1");
        }else if(selected==="Golf Course two"){
        setLocationId("2");
        }else if(selected==="Golf Course three"){
        setLocationId("3");
        }else{
        setLocationId("0");
        }
    }, [selected]);
    // setting message array 
    useEffect(()=>{
        getMessageStreams(AUTH_TOKEN_KEY, locationId)
        .then((data: Message[])=>{
          setMessagesData(data);
        })
        .catch(error => {
          console.error("Cannot fetch message streams:", error);
        });
      }, [locationId]);

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