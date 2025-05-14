import React, {useState, useEffect} from "react";

import {
  getMessageStreams,
} from "./utils/api.tsx";

import {AUTH_TOKEN_KEY} from "./LoginForm.tsx"

import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { Dropdown } from "./Dropdown";
import Menu from "./Menu";

export const App: React.FC = () => {
  // import get locations in a later ticket
  const locationId = "2";

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [, setSelected] = useState<string | null>(null);

  // setting messages array
  interface Message {
    clientName: string;
    clientImage: string;
    unreadCount: number;
    lastMessageAt: number;
    lastMessage: string;
}
  const [messagesData, setMessagesData] = useState<Message[]>([]);

  useEffect(()=>{
    getMessageStreams(AUTH_TOKEN_KEY, locationId)
    .then((data: Message[])=>{
      console.log(data);
      setMessagesData(data);
    })
    .catch(error => {
      console.error("Cannot fetch message streams:", error);
    });
  }, []);

  // forgot password function
  const handleForgot = () => {
    // example code
  };

  // logout function
  const handleLogout = () => {
    try {
      chrome.storage.local.set({ authToken: "" });
    } catch {
      localStorage.removeItem("authToken");
    }
    setIsLoggedIn(false);
  };
  const course = ["Golf Course one", "Golf Course two", "Golf Course three"];

  return (
    // main styling for chrome extension
    <div className="relative bg-white rounded-2xl shadow-lg p-5 w-[336px] h-[595px] border border-alt-grey">
      <Header
        onClose={() => window.close()}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
      {!isLoggedIn ? (
        <LoginForm
          onLogin={() => setIsLoggedIn(true)}
          onClose={() => window.close()}
          onForgotPassword={handleForgot}
        />
      ) : (
        <>
       <div className="mb-1 text-[12px] font-normal text-grayBorder leading-[110%]">
 Location
</div>
        <Dropdown 
          buttonText="Selected option"
          items={course}
          onSelect={(item) => setSelected(item)} 
          />
         <div>Chat interface will go here
            <Menu messagesData={messagesData}/>
        </div>
        </>
      )}
      
    </div>
  );
};
