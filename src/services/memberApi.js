import axiosInstance from './axiosInstance';

/**
 * 닉네임 중복 체크
 */
/** @param {string} nickname */
export const existsNicknameApi = async (nickname) => {
  const response = await axiosInstance.get(`/api/members/nickname/check?nickname=${nickname}`);
  const payload = response.data?.data ?? {};
  console.log(payload);
  return Boolean(payload.newNickname);
};


