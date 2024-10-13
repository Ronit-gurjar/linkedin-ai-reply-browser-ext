# LinkedIn AI Reply Chrome Extension

This browser extension enhances your LinkedIn messaging experience by providing AI-powered message suggestions.

Extension made using [`WXT`](https://wxt.dev/) framework

### Preview :

https://github.com/user-attachments/assets/b2b30eec-5ec3-4b03-9b7f-ed8edc748a30


## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- Google Chrome or Microsoft Edge browser

## Setting Up the Development Environment

Follow these steps to set up the extension for local development:

1. Clone the repository:
   ```
   git clone https://github.com/Ronit-gurjar/linkedin-ai-reply-browser-ext.git
   cd linkedin-assistant-extension
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Build the extension:
   ```
   npm run build
   ```

   For development with hot-reloading, use:
   ```
   npm run dev
   ```

## Loading the Extension in Chrome

1. Open Google Chrome and navigate to `chrome://extensions`.

2. Enable "Developer mode" by toggling the switch in the top right corner.

3. Click on "Load unpacked" and select the `chrome-mv3` folder inside `.output` in your project directory.

4. The LinkedIn AI Reply extension should now appear in your list of extensions.

## Usage

1. Navigate to LinkedIn and open a messaging conversation.

2. Look for the extension icon (a blue pencil) in the message input field.

3. Click the icon to open the AI assistant modal.
   > If the icon doesn't work, open inspect (f12) and than click on the icon.

4. Enter your prompt and click "Generate" to receive AI-generated message suggestions.

5. Click "Insert" to add the generated text to your LinkedIn message.

## Development

- The main content script is located in `src/content.ts`.
- The React components are in the `src/components` directory.
- The background script is in `src/background.ts`.

To make changes, edit the relevant files and rebuild the extension using `npm run build` or `npm run dev` for hot-reloading.

## Contributing

Contributions to the LinkedIn Assistant Extension are welcome. Please feel free to submit a Pull Request.
