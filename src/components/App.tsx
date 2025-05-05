import React from "react";
import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { Dropdown } from "./Dropdown";
import { DropdownCourse } from "./DropdownCourse";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

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
  const course = ["one", "two", "three"];

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
//         <div className="mb-1 text-[12px] font-normal text-grayBorder leading-[110%]">
//   Location
// </div>
        <Dropdown 
          buttonText="Gilory Golf Course"
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
        <div>Chat interface will go here</div>
        </>
      )}
    </div>
  );
};
