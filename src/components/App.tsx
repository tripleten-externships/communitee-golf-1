import React, { useState, useEffect } from "react";

import {
  getMessageStreams,
  sendMessage as apiSend,
  getSingleMessageStream,
} from "./utils/api";
import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useAuth } from "../contexts/useAuth";
import { Dropdown } from "./Dropdown";
import DMView, { Message as DMMessage } from "./DMView";
import Menu, { Message as MenuMessage } from "./Menu";

export const App: React.FC = () => {
  // import get locations in a later ticket
  const locationId = "2";

  const { isAuthenticated, logout, token } = useAuth();
  const [currentView, setCurrentView] = useState<"login" | "forgot">("login");
  const [selected, setSelected] = useState<string | null>(null);

  const [messagesData, setMessagesData] = useState<MenuMessage[]>([]);
  const [activeDm, setActiveDm] = useState<DMMessage | null>(null);
  const [thread, setThread] = useState<
    {
      id: string;
      content: string;
      sentAt: string;
      senderId: string;
    }[]
  >([]);

  useEffect(() => {
    if (!token) return;
    getMessageStreams(token, locationId)
      .then((data: MenuMessage[]) => {
        setMessagesData(data);
      })
      .catch((error) => {
        console.error("Cannot fetch message streams:", error);
      });
  }, [token]);

  // logout function
  const handleLogout = () => {
    logout();
    setCurrentView("login");
  };

  // const handleSelect = async (m: MenuMessage) => {
  //   const streamId = m.id;

  //   setActiveDm({
  //     messageid: m.id,
  //     username: m.clientName,
  //     picture: m.clientImage,
  //     text: m.lastMessage,
  //     timestamp: new Date(m.lastMessageAt).getTime(),
  //   });
  //   const full = await getSingleMessageStream(token!, streamId);
  //   setThread(full.messages);
  // };

  // dev mode handleSelect function to retain sent messages for testing and development using localstorage
  // handle select function above this one is for production
  const handleSelect = async (m: MenuMessage) => {
    const streamId = m.id;

    const saved = localStorage.getItem(streamId);
    if (saved) {
      setThread(JSON.parse(saved));
    } else {
      const full = await getSingleMessageStream(token!, streamId);
      setThread(full.messages);
    }

    setActiveDm({
      messageid: m.id,
      username: m.clientName,
      picture: m.clientImage,
      text: m.lastMessage,
      timestamp: new Date(m.lastMessageAt).getTime(),
    });
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
          {/* shows Location and Dropdown when NOT in a DM view */}
          {!activeDm && (
            <>
              <div className="mb-1 text-[12px] font-normal text-grayBorder leading-[110%]">
                Location
              </div>
              <Dropdown
                buttonText={selected ?? "Select Location"}
                items={course}
                onSelect={(item) => setSelected(item)}
              />
            </>
          )}

          {activeDm ? (
            <DMView
              message={activeDm}
              thread={thread}
              onBack={() => setActiveDm(null)}
              onSend={async (content: string) => {
                // send to backend
                await apiSend(token!, activeDm!.messageid, content);

                // dev mode testing sent messages
                // TODO: in production remove this block and re-fetch the full thread:
                // const full = await getSingleMessageStream(token!, activeDm!.messageid);
                // setThread(full.messages);
                setThread((prev) => {
                  const newMsg = {
                    id: `local-${Date.now()}`,
                    content,
                    sentAt: new Date().toISOString(),
                    senderId: "manager",
                  };

                  // storing sent messages in localstorage for dev mode and testing
                  const newThread = [...prev, newMsg];
                  localStorage.setItem(
                    activeDm!.messageid,
                    JSON.stringify(newThread)
                  );
                  return newThread;
                });
              }}
            />
          ) : (
            <Menu messagesData={messagesData} onSelect={handleSelect} />
          )}
        </>
      )}
    </div>
  );
};
