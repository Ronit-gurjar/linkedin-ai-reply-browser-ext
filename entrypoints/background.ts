export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'showModal') {
      // Send message to the React app in the content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'openModal' });
        }
      });
      sendResponse({ status: 'Message sent to content script' });
    }
  });
  
  
});
