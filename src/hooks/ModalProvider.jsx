import { ModalContext } from './ModalContext';
import { useState, useCallback, useContext } from 'react';


export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLoginModal = useCallback(() => setIsLoginOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginOpen(false), []);

  const openSignupModal = useCallback(() => setIsSignupOpen(true), []);
  const closeSignupModal = useCallback(() => setIsSignupOpen(false), []);


  return (
    <ModalContext.Provider value={{
      isLoginOpen, openLoginModal, closeLoginModal,
      isSignupOpen, openSignupModal, closeSignupModal
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