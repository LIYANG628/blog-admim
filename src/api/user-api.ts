import axiosInstance from ".";

export const getUserInfo = () => axiosInstance.get<null, BaseResponse>('/my/userinfo')

export const getLeftMenus = () => axiosInstance.get<null, BaseResponse>('/my/menus')