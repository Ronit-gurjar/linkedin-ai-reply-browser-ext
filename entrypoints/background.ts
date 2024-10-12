export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message in background:', message);
    if (message.action === 'showModal') {
      console.log('Sending openModal message to content script');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'openModal' });
        }
      });
      sendResponse({ status: 'Message sent to content script' });
    } else if (message.action === 'insertText') {
      console.log('Forwarding insertText message to content script');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { 
            action: 'insertText', 
            text: message.text 
          });
        }
      });
      sendResponse({ status: 'Text insertion message sent to content script' });
    }
  });
});