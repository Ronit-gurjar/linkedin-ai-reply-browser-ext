import React from 'react';
import { createRoot } from 'react-dom/client';
import { defineContentScript } from 'wxt/sandbox';
import App from './popup/App';
import "~/assets/tailwind.css";

const svgIcon = `
<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.4667 8.73332C15.4667 8.88655 15.4063 9.03351 15.2989 9.14187C15.1915 9.25022 15.0458 9.3111 14.8938 9.3111H13.7482V10.4667C13.7482 10.6199 13.6879 10.7668 13.5804 10.8752C13.473 10.9836 13.3273 11.0444 13.1754 11.0444C13.0235 11.0444 12.8778 10.9836 12.7703 10.8752C12.6629 10.7668 12.6026 10.6199 12.6026 10.4667V9.3111H11.4569C11.305 9.3111 11.1593 9.25022 11.0519 9.14187C10.9445 9.03351 10.8841 8.88655 10.8841 8.73332C10.8841 8.58008 10.9445 8.43312 11.0519 8.32477C11.1593 8.21641 11.305 8.15554 11.4569 8.15554H12.6026V6.99998C12.6026 6.84675 12.6629 6.69979 12.7703 6.59143C12.8778 6.48308 13.0235 6.42221 13.1754 6.42221C13.3273 6.42221 13.473 6.48308 13.5804 6.59143C13.6879 6.69979 13.7482 6.84675 13.7482 6.99998V8.15554H14.8938C15.0458 8.15554 15.1915 8.21641 15.2989 8.32477C15.4063 8.43312 15.4667 8.58008 15.4667 8.73332ZM1.719 2.95554H2.86464V4.11109C2.86464 4.26433 2.92499 4.41129 3.03241 4.51965C3.13984 4.628 3.28554 4.68887 3.43746 4.68887C3.58938 4.68887 3.73508 4.628 3.8425 4.51965C3.94993 4.41129 4.01028 4.26433 4.01028 4.11109V2.95554H5.15592C5.30784 2.95554 5.45354 2.89467 5.56096 2.78631C5.66839 2.67796 5.72874 2.531 5.72874 2.37776C5.72874 2.22453 5.66839 2.07757 5.56096 1.96921C5.45354 1.86086 5.30784 1.79998 5.15592 1.79998H4.01028V0.644428C4.01028 0.491192 3.94993 0.344232 3.8425 0.235878C3.73508 0.127523 3.58938 0.0666504 3.43746 0.0666504C3.28554 0.0666504 3.13984 0.127523 3.03241 0.235878C2.92499 0.344232 2.86464 0.491192 2.86464 0.644428V1.79998H1.719C1.56708 1.79998 1.42138 1.86086 1.31396 1.96921C1.20653 2.07757 1.14618 2.22453 1.14618 2.37776C1.14618 2.531 1.20653 2.67796 1.31396 2.78631C1.42138 2.89467 1.56708 2.95554 1.719 2.95554ZM10.8841 11.6222H10.3113V11.0444C10.3113 10.8912 10.2509 10.7442 10.1435 10.6359C10.0361 10.5275 9.89039 10.4667 9.73847 10.4667C9.58655 10.4667 9.44085 10.5275 9.33343 10.6359C9.226 10.7442 9.16565 10.8912 9.16565 11.0444V11.6222H8.59283C8.44091 11.6222 8.29521 11.6831 8.18779 11.7914C8.08036 11.8998 8.02001 12.0467 8.02001 12.2C8.02001 12.3532 8.08036 12.5002 8.18779 12.6085C8.29521 12.7169 8.44091 12.7778 8.59283 12.7778H9.16565V13.3555C9.16565 13.5088 9.226 13.6557 9.33343 13.7641C9.44085 13.8724 9.58655 13.9333 9.73847 13.9333C9.89039 13.9333 10.0361 13.8724 10.1435 13.7641C10.2509 13.6557 10.3113 13.5088 10.3113 13.3555V12.7778H10.8841C11.036 12.7778 11.1817 12.7169 11.2892 12.6085C11.3966 12.5002 11.4569 12.3532 11.4569 12.2C11.4569 12.0467 11.3966 11.8998 11.2892 11.7914C11.1817 11.6831 11.036 11.6222 10.8841 11.6222ZM13.4124 3.53332L3.43746 13.5946C3.22263 13.8111 2.93135 13.9328 2.62764 13.9328C2.32392 13.9328 2.03264 13.8111 1.81781 13.5946L0.335642 12.101C0.229232 11.9937 0.144822 11.8663 0.0872316 11.7261C0.0296415 11.5859 0 11.4356 0 11.2838C0 11.1321 0.0296415 10.9818 0.0872316 10.8416C0.144822 10.7014 0.229232 10.574 0.335642 10.4667L10.3113 0.405373C10.4177 0.298041 10.544 0.2129 10.683 0.154812C10.822 0.0967231 10.971 0.0668251 11.1215 0.0668251C11.2719 0.0668251 11.4209 0.0967231 11.5599 0.154812C11.699 0.2129 11.8253 0.298041 11.9317 0.405373L13.4124 1.89893C13.5188 2.00623 13.6032 2.13363 13.6608 2.27385C13.7184 2.41407 13.748 2.56435 13.748 2.71612C13.748 2.86789 13.7184 3.01818 13.6608 3.1584C13.6032 3.29861 13.5188 3.42601 13.4124 3.53332ZM12.6026 2.71648L11.1211 1.22221L8.82984 3.53332L10.3113 5.0276L12.6026 2.71648Z" fill="#2563EB"/>
</svg>
`;

// create icon and 
function createIcon() {
  const icon = document.createElement('div');
  icon.innerHTML = svgIcon;
  icon.classList.add(
    'w-7',
    'h-7',
    'hidden',
    'shadow-md',
    'flex',
    'justify-center',
    'items-center',
    'absolute',
    'right-2',
    'top-2/3',
    'translate-y-1/2',
    'cursor-pointer',
    'z-50',
    'text-blue-600',
    'bg-white',      
    'rounded-full'
  );
  return icon;
}

//check for input type
function isMessageInputElement(element: Element): boolean {
  return element.closest('.msg-form__contenteditable') !== null;
}

// injecting icon into the message textfield
function injectIconIntoInput(input: HTMLElement) {
  if (!isMessageInputElement(input)) {
    console.log('Not a message input element, skipping icon injection');
    return;
  }

  console.log('Attempting to inject icon into input', input);
  if (input.parentNode && !input.parentNode.querySelector('.extension-icon')) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    
    const icon = createIcon();
    icon.classList.add('extension-icon');
    wrapper.appendChild(icon);
    console.log('Icon injected successfully');

    // Modal control
    icon.addEventListener('click', () => {
      // console.log('Icon clicked! Sending message to background script to show modal.');
      chrome.runtime.sendMessage({ action: 'showModal' });
    });

    input.addEventListener('focus', () => {
      icon.style.display = 'flex';
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        if (input instanceof HTMLTextAreaElement && !input.value) {
          icon.style.display = 'none';
        } else if (input instanceof HTMLElement && input.getAttribute('contenteditable') === 'true' && !input.textContent?.trim()) {
          icon.style.display = 'none';
        }
      }, 100);
    });
  } else {
    console.log('Icon already exists or input has no parent');
  }
}

// observe DOM to look for text fields for inject icon mutation
function observeDOM() {
  console.log('Starting DOM observation');
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const inputs = [
              ...Array.from(element.querySelectorAll('textarea')),
              ...Array.from(element.querySelectorAll('[contenteditable="true"]'))
            ];
            inputs.forEach((input) => injectIconIntoInput(input as HTMLElement));
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// check for messaging route. the extension should work only on messaging/thread route textareas
function isMessagingPage(): boolean {
  return window.location.pathname.startsWith('/messaging/');
}

// injecting response from AI ext into linnkedIn textbox
function insertTextIntoLinkedInInput(text: string) {
  const input = document.querySelector('.msg-form__contenteditable') as HTMLElement;
  if (input) {
    if (input instanceof HTMLTextAreaElement) {
      const currentContent = input.innerHTML;
      input.innerHTML = currentContent + text;
    } else if (input.getAttribute('contenteditable') === 'true') {
      const currentContent = input.innerHTML;
      input.innerHTML = currentContent + text;
    }
    // Trigger input event to notify LinkedIn that the content has changed
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  }
}

// mount app when called 
function renderApp() {
  const root = document.createElement('div');
  root.id = 'linkedin-assistant-root';
  document.body.appendChild(root);

  const reactRoot = createRoot(root);
  reactRoot.render(React.createElement(App));
}

export default defineContentScript({
  matches: ['*://www.linkedin.com/*'],
  main() {
    if (!isMessagingPage()) {
      // console.log('Not on messaging page, extension will not activate');
      return;
    }

    console.log('LinkedIn Assistant activated on messages page');
    observeDOM();
    renderApp();
    
    // Immediate check for existing input elements
    const existingInputs = [
      ...Array.from(document.querySelectorAll('textarea')),
      ...Array.from(document.querySelectorAll('[contenteditable="true"]'))
    ];
    existingInputs.forEach((input) => injectIconIntoInput(input as HTMLElement));

    // Listener to receive messages from the background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'showModal') {
        console.log('Received message to show modal');
        sendResponse({ status: 'Modal shown' });
      } else if (message.action === 'openModal') {
        // Trigger modal opening in React app
        const event = new CustomEvent('openModal');
        window.dispatchEvent(event);
      } else if (message.action === 'insertText') {
        insertTextIntoLinkedInInput(message.text);
      }
    });
  },
});