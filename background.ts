import { getMessageStreams, getSingleMessageStream } from "./src/components/utils/api.tsx"

// remember the last timestamp for each stream
const lastSeen: Record<string, number> = {};
async function getStoredData(): Promise<{ token: string|null; locationId: string|null; userId:string|null; }> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["token","locationId","userId"], (res) => {
      resolve({ token: res.token ?? null, locationId: res.locationId ?? null, userId: res.userId ?? null});
    });
  });
}

// polling function
async function checkForNewMessages() {
 const { token, locationId, userId } = await getStoredData();
 if (!token || !locationId || !userId) return;
  // fetch streams for whatever location
  const streams = await getMessageStreams(token, locationId);
  for (const stream of streams) {
    // fetch individual streams to access messages' senderId
    const singleStream = await getSingleMessageStream(token, stream.id);
    const timeStamp = new Date(stream.lastMessageAt).getTime();
    const prev = lastSeen[stream.id] || 0;
    if (timeStamp > prev) {
      const lastMessage = singleStream.messages[singleStream.messages.length - 1];
    if (singleStream.messages.length > 0){
      const lastSenderId = lastMessage?.senderId; 
      if (lastSenderId !== userId) {         
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
  chrome.alarms.create("pollMessages", { periodInMinutes: 0.5 });
});
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "pollMessages") checkForNewMessages();
});

chrome.notifications.onClicked.addListener((streamId) => {
  const extOrigin = chrome.runtime.getURL(""); 

  const targetUrl = `${extOrigin}index.html#/dm?streamId=${streamId}`;

  chrome.storage.local.get(["lastPopupWindowId"], (rsp) => {
    const prevWinId = rsp.lastPopupWindowId as number | undefined;

    if (typeof prevWinId === "number") {
      // try to fetch popup window by ID
      chrome.windows.get(prevWinId, { populate: true }, (win) => {
        if (chrome.runtime.lastError || !win || win.type !== "popup") {
          console.warn(`[background] previous popup ${prevWinId} missing or not a popup → creating new`);
          createAndStorePopup(targetUrl);
        } else {
          // find any tab or popup whose URL starts with the extension’s origin
          const matchingTab = win.tabs?.find(t => t.url?.startsWith(extOrigin));
          if (matchingTab && matchingTab.id != null) {
            chrome.tabs.update(matchingTab.id, { url: targetUrl });
            chrome.windows.update(prevWinId!, { focused: true });
          } else {
            createAndStorePopup(targetUrl);
          }
        }
      });
    } else {
      createAndStorePopup(targetUrl);
    }
  });
});

function createAndStorePopup(url: string) {
  chrome.windows.create(
    {
      url,
      type:   "popup",
      width:  336,
      height: 625,
    },
    (newWin) => {
      if (newWin && typeof newWin.id === "number") {
        chrome.storage.local.set({ lastPopupWindowId: newWin.id });
      }
    }
  );
}

chrome.windows.onRemoved.addListener((removedWindowId) => {
  chrome.storage.local.get(["lastPopupWindowId"], (rsp) => {
    const stored = rsp.lastPopupWindowId as number | undefined;
    if (stored === removedWindowId) {   
      chrome.storage.local.remove("lastPopupWindowId");
    }
  });
});