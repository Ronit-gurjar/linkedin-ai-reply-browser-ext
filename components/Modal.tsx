import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "~/assets/tailwind.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  // const [isLoading, setIsLoading] = useState(false);    //use to handle response loading actions

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    //setIsLoading(true);
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');

    try {
      // ***use this when need actual API call or generation logic***

      // const apiKey = 'your_openai_api_key';  // Replace with your actual OpenAI API key
      // // Make an API call to the OpenAI endpoint
      // const response = await fetch('https://api.openai.com/v1/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${apiKey}`,
      //   },
      //   body: JSON.stringify({
      //     model: 'text-davinci-003', // or 'gpt-3.5-turbo', 'gpt-4', depending on what you're using
      //     prompt: input,             // The user's input from the modal
      //     max_tokens: 100,           // Limit the length of the generated text
      //     temperature: 0.7,          // Adjust randomness in the output
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error(`OpenAI API error: ${response.statusText}`);
      // }

      // const data = await response.json();

      // // Access the generated response text
      // const result = data.choices[0].text.trim();

      // hardcoding the response
      const result = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
      setMessages(prev => [...prev, { text: result, isUser: false }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { text: 'An error occurred while generating the response.', isUser: false }]);
    }// finally {
    //   setIsLoading(false);
    // }
  };

  const handleInsert = () => {
    const lastBotMessage = messages.filter(m => !m.isUser).pop();
    if (lastBotMessage) {
      chrome.runtime.sendMessage({ 
        action: 'insertText', 
        text: lastBotMessage.text 
      });
    }
    onClose();
  };

  // const handleRegenerate = () => {
  //   // Implement the logic to regenerate the response
  //   console.log('Regenerating response...');
  // };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-50 p-4 rounded-lg shadow-xl max-w-[450px] w-full flex flex-col justify-center items-center gap-2" ref={modalRef}>
      <div className="flex flex-col w-full max-h-[60vh] overflow-y-auto mb-1">
          {messages.map((message, index) => (
            <div key={index} className={`max-w-[80%] mb-2 p-3 rounded-lg text-xl leading-tight ${message.isUser ? 'self-end bg-gray-200 text-gray-600' : 'self-start bg-blue-100 text-gray-600'}`}>
              {message.text}
            </div>
          ))}
      </div>
      
      <div className="w-full flex flex-col gap-3">
      <input
          type="text"
          placeholder="Your prompt"
          className="w-full p-2 text-lg text-gray-500 border-none shadow-inner outline-none mb-2"
          value={input}
          onChange={handleInputChange}
        />
          {messages.length > 0 ? (
            <div className="flex justify-between gap-4 w-fit self-end">
            {/* <button className=[classname] onClick={handleInsert} disabled={isLoading}>  //use when loading response from actual api */}
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-lg text-gray-700 bg-white border border-[#666D80] border-solid rounded-md hover:bg-gray-100" onClick={handleInsert}>
              <svg width="10" height="10" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.1 12.3666V1.43331C6.1 1.05553 6.228 0.739087 6.484 0.483976C6.74 0.228865 7.05644 0.100864 7.43333 0.0999756C7.81111 0.0999756 8.128 0.227976 8.384 0.483976C8.64 0.739976 8.76756 1.05642 8.76667 1.43331V12.3666L12.6333 8.49998C12.8778 8.25553 13.1889 8.13331 13.5667 8.13331C13.9444 8.13331 14.2556 8.25553 14.5 8.49998C14.7444 8.74442 14.8667 9.05553 14.8667 9.43331C14.8667 9.81109 14.7444 10.1222 14.5 10.3666L8.36667 16.5C8.1 16.7666 7.78889 16.9 7.43333 16.9C7.07778 16.9 6.76667 16.7666 6.5 16.5L0.366666 10.3666C0.122222 10.1222 0 9.81109 0 9.43331C0 9.05553 0.122222 8.74442 0.366666 8.49998C0.611111 8.25553 0.922222 8.13331 1.3 8.13331C1.67778 8.13331 1.98889 8.25553 2.23333 8.49998L6.1 12.3666Z" fill="#666D80"/>
              </svg>
              Insert
            </button>
            {/* <button className=[classname] disabled={isLoading}>  //use when loading response from actual api */}
            <button className="flex items-center justify-center gap-2 w-fit min-w-20 text-lg bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              <svg width="12" height="12" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 3.24541V0L4.25 4.32724L8.5 8.65459V5.40903C12.006 5.40903 14.875 8.32995 14.875 11.9C14.875 12.9818 14.6094 14.0098 14.131 14.929L15.6719 16.4978C16.5217 15.1454 17 13.5766 17 11.9C17 7.14005 13.1749 3.24541 8.5 3.24541ZM8.5 18.391C4.9937 18.391 2.125 15.4698 2.125 11.9C2.125 10.8182 2.39062 9.79046 2.8687 8.87081L1.32812 7.30224C0.478072 8.60041 0 10.2232 0 11.9C0 16.6599 3.82511 20.5546 8.5 20.5546V23.8L12.75 19.4728L8.5 15.1454V18.391Z" fill="white"/>
              </svg>
              Regenerate
            </button>
          </div>
          ) : (
            <button className="flex items-center justify-center gap-2 w-fit min-w-20 text-lg self-end bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={handleGenerate} disabled={!input.trim()}>
          {/* <button className=[classname] onClick={handleGenerate} disabled={isLoading || !input.trim()}>  //use when loading response from actual api */}
              <svg width="12" height="12" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.456 11.6075L2.45599 0.607504C2.28356 0.521271 2.08988 0.486719 1.89827 0.508009C1.70665 0.529299 1.52528 0.605523 1.37599 0.727504C1.23341 0.846997 1.12699 1.00389 1.0687 1.18055C1.0104 1.35721 1.00254 1.54662 1.04599 1.7275L4.00599 12.4975L1.00599 23.2375C0.965214 23.3886 0.960455 23.5471 0.992092 23.7003C1.02373 23.8535 1.09088 23.9972 1.18815 24.1198C1.28541 24.2423 1.41008 24.3403 1.55212 24.4059C1.69416 24.4715 1.84962 24.5029 2.00599 24.4975C2.16253 24.4966 2.31667 24.4589 2.45599 24.3875L24.456 13.3875C24.6198 13.3036 24.7573 13.1761 24.8532 13.0191C24.9492 12.862 25 12.6816 25 12.4975C25 12.3135 24.9492 12.133 24.8532 11.9759C24.7573 11.8189 24.6198 11.6914 24.456 11.6075ZM3.55599 21.6075L5.76599 13.4975H15.006V11.4975H5.76599L3.55599 3.3875L21.766 12.4975L3.55599 21.6075Z" fill="white"/>
              </svg>
              {/* {isLoading ? 'Generating...' : 'Generate'}   //use when loading response from actual api */}
              Generate
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;