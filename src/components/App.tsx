import React, {useState, useEffect} from "react";
import {
  getLocations,
} from "./utils/api.tsx";

import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useAuth } from "../contexts/useAuth.ts";
import { Dropdown } from "./Dropdown";
import { Menu } from "./Menu";

export const App: React.FC = () => {
  const { isAuthenticated, logout, token } = useAuth();
  const [currentView, setCurrentView] = useState<"login" | "forgot">("login");
  const [selected, setSelected] = useState<string | null>(null);
  const [locations, setLocations] = useState<{id: string; name: string}[]>([]);
  const [courses, setCourses] = useState<string[]>([]);

  // get locations for the course
  useEffect(()=>{
    if(!token) return;
    getLocations(token)
    .then((data)=>{
        setLocations(data);
        setCourses([data[0].name, data[1].name, data[2].name]);
    })
    .catch((error)=>{
        console.error("Cannot fetch locations:", error);
    })
  },[token]);

  // logout function
  const handleLogout = () => {
    logout();
    setCurrentView("login");
    setLocations([]);
  };
  
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
          <div className="mb-1 text-[12px] font-normal text-grayBorder leading-[110%]">Location</div>
          <Dropdown
            buttonText={selected ?? "Selected option"}
            items={courses}
            onSelect={(item) => setSelected(item)}
          />
          <Menu selected={selected} locations={locations}/>
        </>
      )}
    </div>
  );
};
