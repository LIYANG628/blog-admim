import axiosInstance from ".";

export const getUserInfo = () => axiosInstance.get<null, BaseResponse>('/my/userinfo')

export const getLeftMenus = () => axiosInstance.get<null, BaseResponse>('/my/menus')

export const updateUserInfo = (userinfo: UserInfoForm) => axiosInstance.put<null, BaseResponse>('/my/userinfo', userinfo)