import { getMessageStreams } from "./src/components/utils/api.js"

// remember the last timestamp for each stream
const lastSeen: Record<string, number> = {};

async function getStoredData(): Promise<{ token: string|null; locationId: string|null }> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["token","locationId"], (res) =>
      resolve({ token: res.token ?? null, locationId: res.locationId ?? null })
    );
  });
}

// polling function
async function checkForNewMessages() {
  const { token, locationId } = await getStoredData();
  if (!token || !locationId) return; 

  // fetch streams for whatever location
  const streams = await getMessageStreams(token, locationId);
  streams.forEach((stream) => {
    const timeStamp = new Date(stream.lastMessageAt).getTime();
    const prev = lastSeen[stream.id] || 0;

    if (timeStamp > prev) {
      // new message
      chrome.notifications.create(stream.id, {
        type:           "basic",
        iconUrl:        "icons/notif.png",
        title:          `New message from ${stream.clientName}`,
        message:        stream.lastMessage,
        contextMessage: `${Math.floor((Date.now() - timeStamp) / 60000)}m ago`,
        priority:       2,
      });
      lastSeen[stream.id] = timeStamp;
    }
  });
}


chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("pollMessages", { periodInMinutes: 0.5 });
});
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "pollMessages") checkForNewMessages();
});

// if the user clicks the notification, open popup and tell which stream to show
chrome.notifications.onClicked.addListener((streamId) => {
  //  construct a URL for popup page, including the stream ID
  const url = chrome.runtime.getURL(`index.html#/dm?streamId=${streamId}`);
  
  // open it in a new popup-style window:
  chrome.windows.create({
    url,
    type:   "popup",
    width:  336,   
    height: 625,
  });
});

// GUIDLINES FOR TESTING

// run "npm install" for dependences 
// run "npm run build" to create build to test notifications in google chrome.
// open "chrome://extensions/" in browser, open "load unpacked" and select "dist" folder from communitee-golf-1
// open "service worker" console, paste and run following test notification
// when the notification is clicked it will open a pop-up style window since it seems like you can't trigger the extension itself to open due to google's security.

// chrome.notifications.create("test", {
//   type:    "basic",
//   iconUrl: chrome.runtime.getURL("icons/notif.png"),
//   title:   "🚀 Test Notification",
//   message: "If you see this, it worked!",
//   priority: 2
// }).then((id) => console.log("notification id:", id))
//   .catch((err) => console.error("notify error:", err));

// test notification should pop up or show up in notification center