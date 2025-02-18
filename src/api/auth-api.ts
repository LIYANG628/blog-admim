import axiosInstance from "."

export const RegisterAPI = (regData: RegForm) => axiosInstance.post<null, BaseResponse>('/api/reg', regData)
export const LoginAPI = (loginData: LoginForm) => axiosInstance.post<null, LoginResponse>('/api/login', loginData)