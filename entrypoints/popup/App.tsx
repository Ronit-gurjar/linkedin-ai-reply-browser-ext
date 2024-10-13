import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../../components/Modal';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    console.log('Closing modal');
    setModalOpen(false);
  }, []);

  useEffect(() => {
    const handleOpenModal = () => {
      console.log('openModal event received in App component');
      setModalOpen(true);
    };

    window.addEventListener('openModal', handleOpenModal);

    return () => {
      window.removeEventListener('openModal', handleOpenModal);
    };
  }, []);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default App;