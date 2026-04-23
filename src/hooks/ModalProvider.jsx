import { ModalContext } from './ModalContext';
import { useState, useCallback, useContext } from 'react';


export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [oneBtnModal, setOneBtnModal] = useState(false);

  const openLoginModal = useCallback(() => setIsLoginOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginOpen(false), []);

  const openSignupModal = useCallback(() => setIsSignupOpen(true), []);
  const closeSignupModal = useCallback(() => setIsSignupOpen(false), []);


  const openOneBtnModal = useCallback((props = {}) => {
    setOneBtnModal({ isOpen: true, props });
  }, []);
  const closeOneBtnModal = useCallback((props = {}) => {
    setOneBtnModal({ isOpen: false, props });
  }, []);


  return (
    <ModalContext.Provider value={{
      isLoginOpen, openLoginModal, closeLoginModal,
      isSignupOpen, openSignupModal, closeSignupModal,
      oneBtnModal, openOneBtnModal, closeOneBtnModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};