import React, { useState, useEffect } from "react";
import {Routes, Route, Navigate, useNavigate } from "react-router-dom";

import {
  getMessageStreams,
  sendMessage as apiSend,
  getSingleMessageStream,
  getLocations,
} from "./utils/api";

import { Header } from "./Header";
import { LoginForm } from "./LoginForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { Dropdown } from "./Dropdown";
import DMView, { Message as DMMessage } from "./DMView";
import Menu, { Message as MenuMessage } from "./Menu";

import { useAuth } from "../contexts/useAuth.ts";

import { ProtectedRoute } from "./ProtectedRoute.tsx";

export const App: React.FC = () => {
  const { isAuthenticated, logout, token } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);
  const [locationId, setLocationId] = useState<string>("");
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
  const navigate = useNavigate();

  // get locations for the course
  useEffect(() => {
    if (!token) return;
    getLocations(token)
      .then((data) => {
        setLocations(data);
      })
      .catch((err) => console.error("Cannot fetch locations:", err));
  }, [token]);

  // whenever the user picks a different course, update locationId
  useEffect(() => {
    if (!selected) return;
    const match = locations.find((location) => location.name === selected);
    setLocationId(match ? match.id : "");
  }, [selected, locations]);

  // fetch messageStreams for the current location
  useEffect(() => {
    if (!token || !locationId) return;
    getMessageStreams(token, locationId)
      .then((data: MenuMessage[]) => setMessagesData(data))
      .catch((err) => console.error("Cannot fetch message streams:", err));
  }, [token, locationId]);

  // logout function
  const handleLogout = () => {
    logout();
    setLocations([]);
  };
  // dev mode handleSelect function to retain sent messages for testing and development using localstorage
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
    {navigate("/dm")}
  };

  return (
    // main styling for chrome extension
    <div className="relative bg-white rounded-2xl shadow-lg p-5 w-[336px] h-[595px] border border-alt-grey">
      <Header
        onClose={() => window.close()}
        onLogout={handleLogout}
        isLoggedIn={isAuthenticated}
      />
        <Routes>
          <Route 
            path="/"
            element={
                <LoginForm
                onLogin={() => {navigate("/options")}}
                onForgotPassword={() => {navigate("/forgot-password")}}
                />
            }
          />
          <Route 
            path="/options"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <div className="mb-1 text-[12px] font-normal text-grayBorder leading-[110%]">Location</div>
                <Dropdown
                  buttonText={selected ?? "Select Location"}
                  items={locations}
                  onSelect={(item) => setSelected(item)}
                />
                <Menu
                  messagesArray={messagesData}
                  onSelect={handleSelect}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ForgotPasswordForm onBackToLogin={() => {navigate("/")}} />
            }
          />
          <Route 
            path="/dm"
            element={
              activeDm ? (
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DMView
                    message={activeDm}
                    thread={thread}
                    onBack={() => {
                      setActiveDm(null);
                      {navigate("/options")};
                    }}
                    onSend={async (content: string) => {
                      // send to backend
                      await apiSend(token!, activeDm!.messageid, content);

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
                </ProtectedRoute>
              ) : (<Navigate to="/options" replace />)
            }
          />
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to="/options" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
    </div>
  );
};