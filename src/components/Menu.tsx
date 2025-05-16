import React, {useState, useEffect} from "react";

import {
    getMessageStreams,
    getLocations,
} from "./utils/api.tsx";

import MessagePreview from "./MessagePreview";
import { useAuth } from "../contexts/useAuth.ts";

export interface Message {
    clientName: string;
    clientImage: string;
    unreadCount: number;
    lastMessageAt: number;
    lastMessage: string;
    locationId: string;
}
export interface MenuProps {
    selected: string | null;
    messagesArray?: Message[];
}

export const Menu: React.FC<MenuProps> = ({ selected, messagesArray }) => {
    // setting locationId
    const [locationId, setLocationId] = useState("0");
    const [locations, setLocations] = useState<{id: string; name: string}[]>([]);
    const { token } = useAuth();
    const [messagesData, setMessagesData] = useState<Message[]>(messagesArray ?? []);
    const shouldFetch = !messagesArray;

    // getting locations from mock api
    useEffect(()=>{
        if(!token || !shouldFetch) return;
        getLocations(token)
        .then((data)=>{
            setLocations(data);
        })
        .catch((error)=>{
            console.error("Cannot fetch location:", error);
        })
    },[shouldFetch, token]);

    // finding the right location based on selection
    useEffect(()=>{
        if (!shouldFetch || !selected) return;
        const select = locations.find((location) => location.name === selected);
        setLocationId(select ? select.id : "");
    },[selected, locations, shouldFetch])

    // setting message array 
    useEffect(()=>{
        if (!token || !shouldFetch || !locationId) return;
        getMessageStreams(token, locationId)
        .then((data)=>{
          setMessagesData(data);
        })
        .catch(error => {
          console.error("Cannot fetch message streams:", error);
        });
      }, [locationId, shouldFetch, token]);
    return(
        <div>
            <p className = {`font-poppins font-medium text-center text-base w-[152px] text-black border-b-2 border-b-black mt-[30px] mx-[auto] py-[10px]`}>Messages ({messagesData.length})</p>
            <ul className="flex flex-col justify-center items-center mt-[16px] gap-[12px]">
                {messagesData.map((message) => (
                    <MessagePreview 
                        key={`${message.clientName}-${message.locationId}`}
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