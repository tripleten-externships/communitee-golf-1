import React, { useState } from "react";
import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { Dropdown } from "./Dropdown";
import { DropdownCourse } from "./DropdownCourse";
import Menu from "./Menu";
import DMView, { Message } from "./DMView";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const course = ["one", "two", "three"];

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
    <div className="relative bg-white rounded-2xl shadow-lg p-4 w-[336px] h-[595px] border border-[var(--Alt-grey,rgba(222,222,222,0.3))]">
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
      ) : selectedMessage ? (
        // If a message is selected, drop in the DMView
        <DMView
          message={selectedMessage}
          onBack={() => setSelectedMessage(null)}
        />
      ) : (
        <>
          <div className="mb-1 text-[12px] font-normal text-[#959494] leading-[110%]">
            Location
          </div>
          <Dropdown
            buttonText="Glory Golf Course"
            content={
              <>
                {course.map((item) => (
                  <DropdownCourse key={item} onClick={() => {}}>
                    {`Golf Course ${item}`}
                  </DropdownCourse>
                ))}
              </>
            }
          />
          <Menu
            onSelectMessage={(msg: React.SetStateAction<Message | null>) =>
              setSelectedMessage(msg)
            }
          />
        </>
      )}
    </div>
  );
};
