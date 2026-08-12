import { create } from "zustand";

// 마이페이지 메뉴
// 메뉴: 회원 정보 수정(1) / 비밀번호 변경(2) / 회원 탈퇴(3) / 여행 포인트(4)

const menuStore = create((set) => ({
  // 현재 선택된 메뉴
  selectedMenu: '1',
  setSelectedMenu: (newData) =>
    set({
      selectedMenu: newData
    }),
}));

export default menuStore;
