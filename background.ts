import { getMessageStreams } from "./src/components/utils/api.js"


// remember the last timestamp for each stream
const lastSeen: Record<string, number> = {};
async function getStoredData(): Promise<{ token: string|null; locationId: string|null }> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["token","locationId"], (res) => {
      console.log("Background read token/locationId:", res.token, res.locationId);
      resolve({ token: res.token ?? null, locationId: res.locationId ?? null });
    });
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



// TEST notifications for mock api
// Start of code for automatically getting notifications from mock API
//
async function exampleNotifications(){
 const { token, locationId } = await getStoredData();
 if (!token || !locationId) return;
 const streams = await getMessageStreams(token, locationId);
 streams.forEach((stream) => {
   console.log(stream)
   chrome.notifications.create(stream.id, {
     type:    "basic",
     iconUrl: chrome.runtime.getURL("icons/notif.png"),
     title:  `New message from ${stream.clientName}`,
     message: stream.lastMessage,
     priority: 2
   }, (id) => {
     if (chrome.runtime.lastError) {
       console.error("notify error:", chrome.runtime.lastError.message);
     } else {
       console.log("notification id:", id);
     }
   });
 });
}

chrome.runtime.onInstalled.addListener(() => {
 chrome.alarms.create("pollMessages", { periodInMinutes: 0.1 });
 exampleNotifications();
});
chrome.alarms.onAlarm.addListener(alarm => {
 if (alarm.name === "pollMessages") {
   exampleNotifications();
 }
});
chrome.runtime.onMessage.addListener((message) => {
 if (message.action === "loginAndLocationSelected") {
   exampleNotifications();
 }
});
//
// End of code for automatically getting notifications from mock API
//

