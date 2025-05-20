import React from "react";
import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { Dropdown } from "./Dropdown";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import { getLocations } from "./utils/api";
import { useAuth } from "../contexts/useAuth";
// import { AUTH_TOKEN_KEY } from "./LoginForm";

export const App: React.FC = () => {
  const { isAuthenticated, logout, token } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [course, setCourse] = useState<string[]>([]);
  const [locations, setLocations] = useState<{id: string; name: string}[]>([]);

  useEffect(() => {
    console.log("Token is:", token);
    if (!token) return;
    
    getLocations(token)
      .then((data) => {
        setLocations(data);
        setCourse(data.map((location: { name: any }) => location.name));
        if (!selected && data.length) setSelected(data[0].name);
      })
      .catch((err) => console.error("Cannot fetch locations:", err));
  }, [token]);

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
