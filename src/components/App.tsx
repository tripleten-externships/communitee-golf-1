import React, {useState, useEffect} from "react";
import {
  getLocations,
} from "./utils/api.tsx";

import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { Dropdown } from "./Dropdown";
import { Menu } from "./Menu";
import {AUTH_TOKEN_KEY} from "./LoginForm.tsx"

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [course, setCourse] = useState<string[]>([]);

  // get locations for the course
  useEffect(()=>{
    getLocations(AUTH_TOKEN_KEY)
    .then((data)=>{
        console.log(data[0].name);
        setCourse([data[0].name, data[1].name, data[2].name]);
    })
    .catch((error)=>{
        console.error("Cannot fetch locations:", error);
    })
  },[]);

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
       <div className="mb-1 text-[12px] font-normal text-grayBorder leading-[110%]">Location</div>
        <Dropdown 
          buttonText="Selected option"
          items={course}
          onSelect={(item) => setSelected(item)} 
        />
        <Menu selected={selected}/>
        </>
      )}
      
    </div>
  );
};
