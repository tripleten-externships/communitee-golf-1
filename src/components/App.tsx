import React from "react";
import { LoginForm } from "./LoginForm";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleForgot = () => {
    // example code
  };

  return (
    // main styling for chrome extension
    <div className="relative bg-white rounded-2xl shadow-lg p-5 w-[336px] h-[595px] border border-[var(--Alt-grey,rgba(222,222,222,0.3))]">
      {!isLoggedIn ? (
        <LoginForm
          onLogin={() => setIsLoggedIn(true)}
          onClose={() => window.close()}
          onForgotPassword={handleForgot}
        />
      ) : (
        <div>Chat interface will go here</div>
      )}
    </div>
  );
};
