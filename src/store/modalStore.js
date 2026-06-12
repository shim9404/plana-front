import { create } from "zustand";

const modalStore = create((set, get) => ({
  // 로그인 모달
  isLoginOpen: false,
  openLoginModal: () =>
    set({
      isLoginOpen: true
    }),
  closeLoginModal: () =>
    set({
      isLoginOpen: false
    }),

  // 회원가입 모달
  isSignupOpen: false,
  openSignupModal: () =>
    set({
      isSignupOpen: true
    }),
  closeSignupModal: () =>
    set({
      isSignupOpen: false
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
  }
}));

export default modalStore;