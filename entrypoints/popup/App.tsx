import React, { useState, useEffect, useCallback } from 'react';
import Modal from '@/components/Modal';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    console.log('Closing modal');
    setModalOpen(false);
  }, []);

  useEffect(() => {
    const handleMessage = (message: any) => {
      console.log('Received message in App component:', message);
      if (message.action === 'openModal') {
        console.log('Opening modal');
        setModalOpen(true);  // Open the modal when the message is received
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);
  
    // Clean up the listener
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default App;