import axios from 'axios'
import config from '@/config.json';
import qs from 'qs';
import { message } from 'antd';
import useAppStore from '@/store';
import { resetAllStore } from '@/store/resetter';

const axiosInstance = axios.create({
    baseURL: config.baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": "ab428ee8-c6ae-4bee-86ca-a5bd3437cff5"
    }
})

// request interceptor
axiosInstance.interceptors.request.use(config => {
    const URL = config.url?.toUpperCase();
    config.transformRequest = (data) => {
        if (data instanceof FormData) {
            return qs.stringify(Object.entries(data));
        } else {
            return qs.stringify(data)
        }
    }

    // set token
    const token = useAppStore.getState().token;
    if (URL?.includes('/MY') && token) {
        config.headers.Authorization = token;
    }
    return config;

}, (err) => {
    return Promise.reject(err)
})

// response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status == 200) {
        return response.data;
    }
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let errorMsg = '';
    if (error.response && error.response.data) {
        errorMsg = error.response.data.message;
        if (error.response.status == 401) {
            errorMsg = "Invalid Credential, please re-login"
            if (useAppStore.getState().token) {
                message.error(errorMsg);
                resetAllStore();
            }
        }
    } else {
        if (error.code == "ERR_NETWORK") {
            errorMsg = 'Network connection error'
        } else if (error.code == "ECONNABORTED") {
            errorMsg = 'Timeout error'
        } else {
            errorMsg = "Ooops, please try again"
            message.error(errorMsg);
        }
    }


    return Promise.reject(error);
})

export default axiosInstance;