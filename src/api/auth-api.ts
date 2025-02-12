import axiosInstance from "."

export const RegisterAPI = (regData: RegForm) => axiosInstance.post('/api/reg', regData)