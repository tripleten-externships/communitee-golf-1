import React, { useState } from "react";
import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useAuth } from "../contexts/AuthContext";
import { Dropdown } from "./Dropdown";
import Menu from "./Menu";

export const App: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [currentView, setCurrentView] = useState<"login" | "forgot">("login");
  const [selected, setSelected] = useState<string | null>(null);

  // logout function
  const handleLogout = () => {
    logout();
    setCurrentView("login");
  };
  
  const course = ["Golf Course one", "Golf Course two", "Golf Course three"];

  return (
    // main styling for chrome extension
    <div className="relative bg-white rounded-2xl shadow-lg p-5 w-[336px] h-[595px] border border-alt-grey">
      <Header
        onClose={() => window.close()}
        onLogout={handleLogout}
        isLoggedIn={isAuthenticated}
      />
      {!isAuthenticated ? (
        currentView === "login" ? (
          <LoginForm
            onLogin={() => {}}
            onForgotPassword={() => setCurrentView("forgot")}
          />
        ) : (
          <ForgotPasswordForm onBackToLogin={() => setCurrentView("login")} />
        )
      ) : (
        <>
          <div className="mb-1 text-[12px] font-normal text-grayBorder leading-[110%]">
            Location
          </div>
          <Dropdown
            buttonText={selected ?? "Selected option"}
            items={course}
            onSelect={(item) => setSelected(item)}
          />
          <div>
            Chat interface will go here
            <Menu messages={["Bob", "Buddy"]} />
          </div>
        </>
      )}
    </div>
  );
};
