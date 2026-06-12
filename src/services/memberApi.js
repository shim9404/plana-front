import axiosInstance from './axiosInstance';

/**
 * 닉네임 중복 체크
 */
/** @param {string} nickname */
export const existsNicknameApi = async (nickname) => {
  const response = await axiosInstance.get(`/api/members/nickname/check?nickname=${nickname}`);
  const payload = response.data?.data ?? {};
  return Boolean(payload.newNickname);
};


/** @param {Record<string, string|undefined>} [params] */
export const getAllMembersApi = async (params = {}) => {
  console.log(params)
  const response = await axiosInstance.get('/api/admin/getAllMembers', { params });
  return response.data;
};

/**
 * @param {string|number} memberId
 * @param {'MEMBER'|'MANAGER'|'ADMIN'} role
 */
export const updateRoleApi = async (memberId, role) => {
  const response = await axiosInstance.patch(`/api/admin/updateRole`, { memberId, role });
  return response.data;
};

/**
 * @param {string|number} memberId
 * @param {'ACTIVE'|'INACTIVE'|'DELETE'} status
 */
export const updateStatusApi = async (memberId, status) => {
  const response = await axiosInstance.patch(`/api/admin/updateStatus`, { memberId, status });
  return response.data;
};

/**
 * 회원 정보 호출
 * @param {string|number} memberId
 */
export const getMemberApi = async (memberId) => {
  const response = await axiosInstance.get(`/api/members/${memberId}`);
  return response.data;
};

/**
 * 회원 정보 수정
 * @param {string|number} memberId
 * @param {{ nickname: string, password: string }} payload
 */
export const changeMemberApi = async (memberId, payload) => {
  const response = await axiosInstance.patch(`/api/members/${memberId}`, payload);
  const reulst = response.data ?? {};
  return reulst.success;
};

/**
 * 회원 비밀번호 수정
 * @param {string|number} memberId
 * @param {{ currentPassword: string, newPassword: string }} payload
 */
export const changePasswordApi = async (memberId, payload) => {
  const response = await axiosInstance.patch(`/api/members/${memberId}/password`, payload);
  const reulst = response.data ?? {};
  return reulst.success;
};

/** 
 * 회원 탈퇴
 * @param {string|number} memberId
 * @param {{ emaail: string, name: string, password: string }} payload
 */
export const withdrawMemberApi = async (memberId, payload) => {
  const response = await axiosInstance.patch(`/api/members/${memberId}/withdraw`, payload);
  const reulst = response.data ?? {};
  return reulst.success;
};

/** 
 * 회원 여행 목록 호출
 * @param {string|number} memberId
 */
export const getTripbyMemberIdApi = async (memberId) => {
  const response = await axiosInstance.get(`/api/members/${memberId}/trips`);
  return response.data;
};

/** 
 * 회원 여행 목록 호출
 * @param {string|number} memberId
 */
export const getTrashPlanApi = async (memberId) => {
  const response = await axiosInstance.get(`/api/members/${memberId}/trips/trashs`);
  return response.data;
};


/** @param {{ nickname: string }} nickname */
export const changNickname = async (memberId, nickname) => {
  const response = await axiosInstance.patch(`/api/members/${memberId}`, { nickname });
  return response.data;
}
