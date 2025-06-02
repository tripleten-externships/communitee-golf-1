import { getMessageStreams, getSingleMessageStream } from "./src/components/utils/api.tsx"


// remember the last timestamp for each stream
const lastSeen: Record<string, number> = {};
async function getStoredData(): Promise<{ token: string|null; locationId: string|null }> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["token","locationId"], (res) => {
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
  for (const stream of streams) {
    // fetch individual streams to access messages' senderId
    const singleStream = await getSingleMessageStream(token, stream.id);
    const timeStamp = new Date(stream.lastMessageAt).getTime();
    const prev = lastSeen[stream.id] || 0;
    if (timeStamp > prev) {
      const lastMessage = singleStream.messages[singleStream.messages.length - 1];
      // Given that the externship does not provide real data of real user accounts, 
      // the username is hardcoded in; matching the provided API's account: "user-123".
    if (singleStream.messages.length > 0){
      const lastSenderId = lastMessage?.senderId; 
      if (lastSenderId !== "user-123") {         
        // new message if from sender.        
       chrome.notifications.create(stream.id, {
           type:           "basic",
           iconUrl:        "icons/notif.png",
           title:          `New message from ${stream.clientName}`,
           message:        stream.lastMessage,
           priority:       2,
         });
       }
    }
      lastSeen[stream.id] = timeStamp;
    }
  }
}

chrome.runtime.onInstalled.addListener(() => {
 chrome.alarms.create("pollMessages", { periodInMinutes: 0.12 });
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