// entrypoints/content.ts

import { defineContentScript } from 'wxt/sandbox';

const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8v4m0 4h.01"/>
</svg>
`;

function createIcon() {
  const icon = document.createElement('div');
  icon.innerHTML = svgIcon;
  icon.style.cssText = `
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1000;
    color: #0a66c2; // LinkedIn's primary blue color
  `;
  return icon;
}

function injectIconIntoTextArea(textArea: HTMLTextAreaElement) {
  if (textArea.parentNode && !textArea.parentNode.querySelector('.extension-icon')) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    textArea.parentNode.insertBefore(wrapper, textArea);
    wrapper.appendChild(textArea);
    
    const icon = createIcon();
    icon.classList.add('extension-icon');
    wrapper.appendChild(icon);

    icon.addEventListener('click', () => {
      console.log('Icon clicked! Show modal here.');
      chrome.runtime.sendMessage({ action: 'showModal' });
    });
  }
}

function observeDOM() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const textAreas = element.querySelectorAll('textarea');
            textAreas.forEach((textArea) => injectIconIntoTextArea(textArea as HTMLTextAreaElement));
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

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    console.log('LinkedIn Assistant activated');
    observeDOM();
  },
});