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

/** @param {{ memberId: string, password?: string }} payload */
export const withdrawMemberApi = async (payload) => {
  const response = await axiosInstance.post('/api/members/withdraw', payload);
  return response.data;
};

/** @param {{ nickname: string }} nickname */
export const changNickname = async (memberId, nickname) => {
  const response = await axiosInstance.patch(`/api/members/${memberId}`, { nickname });
  return response.data;
}
