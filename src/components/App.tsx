import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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
import type {Item} from "./Dropdown.tsx";

import { useAuth } from "../contexts/useAuth.ts";

import { ProtectedRoute } from "./ProtectedRoute.tsx";

export const App: React.FC = () => {
  const { isAuthenticated, logout, token, user } = useAuth();
  const [selectedLocationName, setSelectedLocationName] = useState<string | null>(null);
  const [locations, setLocations] = useState<{ id: string; name: string }[]>(
    []
  );
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

  // persist our auth token so the service worker can read it
  useEffect(() => {
    if (!token || !user) return;
    if (window.chrome?.storage?.local) {
      chrome.storage.local.set({ token: token, userId: user.id });
    } else {
      // dev‐mode fallback for npm run dev
      window.localStorage.setItem("token", token);
    }
  }, [token, user]);

  // when notification is clicked, load that stream, set it as active, and navigate into the DM view.
  useEffect(() => {
    const hash = window.location.hash;
    const [path, query] = hash.split("?");
    if (path === "#/dm" && query) {
      const params = new URLSearchParams(query);
      const streamId = params.get("streamId");
      if (streamId && token) {
        // fetch the thread, then navigate into /dm
        getSingleMessageStream(token, streamId)
          .then((full) => {
            setThread(full.messages);
            setActiveDm({
              messageid: streamId,
              username: full.clientName,
              picture: full.clientImage,
              text: full.lastMessage,
              timestamp: new Date(full.lastMessageAt).getTime(),
            });
            navigate("/dm");
          })
          .catch(console.error);
      }
    }
  }, [token, navigate]);

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
    if (!selectedLocationName) return;
    const match = locations.find((location) => location.name === selectedLocationName);
    const id = match ? match.id : "";
    setLocationId(id);

    chrome.storage.local.set({ locationId: id });
    window.localStorage.setItem("locationId", id);
  }, [selectedLocationName, locations]);

  // fetch messageStreams for the current location
  useEffect(() => {
    if (!token || !locationId) return;
    getMessageStreams(token, locationId)
      .then((data: MenuMessage[]) => setMessagesData(data))
      .catch((err) => console.error("Cannot fetch message streams:", err));
  }, [token, locationId]);

  // redirect to the options screen when auth state becomes true
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/options");
    }
  }, [isAuthenticated, navigate]);

  // navigate into the DM view once a conversation is selected
  useEffect(() => {
    if (activeDm) {
      navigate("/dm");
    }
  }, [activeDm, navigate]);

  // logout function
  const handleLogout = () => {
    setActiveDm(null);
    logout();
    setLocations([]);
    setActiveDm(null);
  };

  // messaging system
  const handleSelect = async (m: MenuMessage) => {
    const full = await getSingleMessageStream(token!, m.id);
    setThread(full.messages);

    setActiveDm({
      messageid: m.id,
      username: m.clientName,
      picture: m.clientImage,
      text: m.lastMessage,
      timestamp: new Date(m.lastMessageAt).getTime(),
    });
  };

  // notification system
  useEffect(() => {
    if (!window.chrome?.runtime?.onMessage) return;

    function handleMessage(msg: { openStream?: string }) {
      if (!msg.openStream || !isAuthenticated) return;

      const stream = messagesData.find((m) => m.id === msg.openStream);
      if (!stream) return;

      getSingleMessageStream(token!, stream.id).then((full) => {
        setThread(full.messages);
        setActiveDm({
          messageid: stream.id,
          username: stream.clientName,
          picture: stream.clientImage,
          text: stream.lastMessage,
          timestamp: new Date(stream.lastMessageAt).getTime(),
        });
        navigate("/dm");
      });
    }

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [messagesData, token, isAuthenticated, navigate]);

  return (
    // main styling for chrome extension
    <div className="relative bg-white rounded-2xl shadow-lg p-5 w-[336px] h-[595px] border border-alt-grey overflow-hidden">
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
              onForgotPassword={() => {
                navigate("/forgot-password");
              }}
            />
          }
        />
        <Route
          path="/options"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div className="mb-1 text-[12px] font-normal text-grayBorder leading-[110%]">
                Location
              </div>
              <Dropdown
                buttonText={selectedLocationName ?? "Select Location"}
                items={locations.map(loc => ({ id: loc.id, title: loc.name }))}
                onSelect={(item: Item) => setSelectedLocationName(item.title)}
              />
              <Menu messagesArray={messagesData} onSelect={handleSelect} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordForm
              onBackToLogin={() => {
                navigate("/");
              }}
            />
          }
        />
        <Route
          path="/dm"
          element={
            activeDm && user ? (
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DMView
                  currentUserId={user!.id}
                  message={activeDm}
                  thread={thread}
                  onBack={() => setActiveDm(null)}
                  onSend={async (content) => {
                    await apiSend(token!, activeDm.messageid, content);
                    const newList = await getMessageStreams(token!, locationId);
                    setMessagesData(newList);
                    const full = await getSingleMessageStream(
                      token!,
                      activeDm.messageid
                    );
                    setThread(full.messages);
                  }}
                />
              </ProtectedRoute>
            ) : (
              <Navigate to="/options" replace />
            )
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
