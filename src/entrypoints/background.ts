


export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log({message})
    if(message.action === "getMutedInfo") {
      if(typeof sender?.tab?.id !== "undefined") {
        browser.tabs.get(sender.tab.id, (tab) => {
          sendResponse({ found: true, mutedInfo: tab.mutedInfo });
        });
      } else {
        sendResponse({ found: false });
      }
      return true; // keeps the channel open for async response
    }
    else if(message.action === "setMuted") {
      if(typeof sender?.tab?.id !== "undefined") {
        browser.tabs.update(sender?.tab?.id, { muted: true });
      }
    }
    else if(message.action === "setUnmuted") {
      if(typeof sender?.tab?.id !== "undefined") {
        browser.tabs.update(sender?.tab?.id, { muted: false });
      }
    }
  });
});
