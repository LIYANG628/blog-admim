/// <reference types="vite/client" />

// define all immediately usable types

// register parameter type
type RegForm = {
    username: string,
    password: string,
    repassword: stirng
}

type LoginForm = Omit<RegForm, 'repassword'>;

interface BaseResponse {
    code: number,
    message: string
}

interface LoginResponse extends BaseResponse {
    token:string
}