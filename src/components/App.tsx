import React from "react";
import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { Dropdown } from "./Dropdown";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import { getLocations } from "./utils/api";
import { AUTH_TOKEN_KEY } from "./LoginForm";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [, setSelected] = useState<string | null>(null);
  const [course, setCourse] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoggedIn) return;
  
    chrome.storage.local.get([AUTH_TOKEN_KEY], async (result) => {
      const token = result[AUTH_TOKEN_KEY];
  
      if (!token) {
        console.warn("No token in chrome.storage.local");
        return;
      }
  
      try {
        const data = await getLocations(token);
        const names = data.map((loc: { name: string }) => loc.name);
        setCourse(names);
      } catch (error) {
        console.error("Failed to load locations", error);
      }
    });
  }, [isLoggedIn]);
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
  // const course = ["Golf Course one", "Golf Course two", "Golf Course three"];

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
            <Menu messages={["Bob", "Buddy"]}/>
        </div>
        </>
      )}
      
    </div>
  );
};
