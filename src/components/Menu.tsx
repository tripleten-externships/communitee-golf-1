import React, {useState, useEffect} from "react";

import {
    getMessageStreams,
    getLocations,
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
    // setting locationId
    const [locationId, setLocationId] = useState("0");
    const [locations, setLocations] = useState<{id: string; name: string}[]>([]);
    const [messagesData, setMessagesData] = useState<Message[]>([]);
    
    // getting locations from mock api
    useEffect(()=>{
        getLocations(AUTH_TOKEN_KEY)
        .then((data)=>{
            setLocations(data);
        })
        .catch((error)=>{
            console.error("Cannot fetch location:", error);
        })
    },[]);

    // finding the right location based on selection
    useEffect(()=>{
        const select = locations.find((location) => location.name === selected);
        setLocationId(select ? select.id : "0");
    },[selected, locations])

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