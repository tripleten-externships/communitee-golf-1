import { getMessageStreams } from "./src/components/utils/api.js"

// remember the last timestamp for each stream
const lastSeen: Record<string, number> = {};
const POLL_INTERVAL = 30_000; // 30 seconds

// helper to pull stored token out of chrome.storage
async function getStoredToken(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["token"], (res) => resolve(res.token ?? null));
  });
}

// polling function
async function checkForNewMessages() {
  const token = await getStoredToken();
  if (!token) return;  // not logged in yet

  // fetch streams for whatever location
  const streams = await getMessageStreams(token, /* yourLocationId */);
  streams.forEach((stream) => {
    const ts = new Date(stream.lastMessageAt).getTime();
    const prev = lastSeen[stream.id] || 0;

    if (ts > prev) {
      // new message
      chrome.notifications.create(stream.id, {
        type:           "basic",
        iconUrl:        "icons/notif.png",
        title:          `New message from ${stream.clientName}`,
        message:        stream.lastMessage,
        contextMessage: `${Math.floor((Date.now() - ts) / 60000)}m ago`,
        priority:       2,
      });
      lastSeen[stream.id] = ts;
    }
  });
}

// when extension first installs or updates, start polling
chrome.runtime.onInstalled.addListener(() => {
  checkForNewMessages();
  setInterval(checkForNewMessages, POLL_INTERVAL);
});

// if the user clicks the notification, open popup and tell which stream to show
chrome.notifications.onClicked.addListener((streamId) => {
  chrome.action.openPopup();
  chrome.runtime.sendMessage({ openStream: streamId });
});

// GUIDLINES FOR TESTING

// run "npm install" for dependences 
// run "npm run build" to create build to test notifications in google chrome.
// open "chrome://extensions/" in browser, open "load unpacked" and select "dist" folder from communitee-golf-1
// open "service worker" console, paste and run following test notification

// chrome.notifications.create("test", {
//   type:    "basic",
//   iconUrl: chrome.runtime.getURL("icons/notif.png"),
//   title:   "🚀 Test Notification",
//   message: "If you see this, it worked!",
//   priority: 2
// }).then((id) => console.log("notification id:", id))
//   .catch((err) => console.error("notify error:", err));

// test notification should pop up