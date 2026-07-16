import { create } from "zustand";

const modalStore = create((set, get) => ({
  // 로그인 모달
  loginModal: false,
  openLoginModal: (props = {}) =>
    set({
      loginModal: {
        isOpen: true,
        props
      }
    }),
  closeLoginModal: () => {
    const { loginModal } = get();
    loginModal.props?.onClose && loginModal.props.onClose();
    set({
      loginModal: {
        ...loginModal,
        isOpen: false,
      }
    });
  },
  confirmLoginModal: () => {
    const { loginModal } = get();
    loginModal.props?.onLogin && loginModal.props.onLogin();
    set({
      loginModal: {
        ...loginModal,
        isOpen: false,
      }
    });
  },
  // 회원가입 모달
  isSignupOpen: false,
  openSignupModal: (props = {}) =>
    set({
      isSignupOpen: true,
      props
    }),
  closeSignupModal: (props = {}) =>
    set({
      isSignupOpen: false,
      props
    }),

  // One Button(닫기 버튼) 모달
  oneBtnModal: false,
  openOneBtnModal: (props = {}) =>
    set({
      oneBtnModal: {
        isOpen: true,
        props
      }
    }),
  closeOneBtnModal: (props = {}) =>
    set({
      oneBtnModal: {
        isOpen: false,
        props
      }
    }),

  // Two Button Modal(닫기, 취소 버튼) 모달
  twoBtnModal: false,
  openTwoBtnModal: (props = {}) =>
    set({
      twoBtnModal: {
        isOpen: true,
        props
      }
    }),
  closeTwoBtnModal: (props = {}) =>
    set({
      twoBtnModal: {
        isOpen: false,
        props
      }
    }),
  confirmTwoBtnModal: () => {
    const { twoBtnModal } = get();
    twoBtnModal.props?.onOk && twoBtnModal.props.onOk();
    set({
      twoBtnModal: {
        ...twoBtnModal,
        isOpen: false
      }
    });
  },
  // 우측 메뉴 드로어
  menuDrawer: false,
  openMenuDrawer: (props = {}) =>
    set({
      menuDrawer: {
        isOpen: true,
        props
      }
    }),
  closeMenuDrawer: (props = {}) =>
    set({
      menuDrawer: {
        isOpen: false,
        props
      }
    }),
}));

export default modalStore;