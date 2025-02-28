/// <reference types="vite/client" />

// define all immediately usable types

// register parameter type
type RegForm = {
    username: string,
    password: string,
    repassword: stirng
}

type LoginForm = Omit<RegForm, 'repassword'>;

interface BaseResponse<T = unknown> {
    code: number,
    message: string,
    data?: T
}

interface LoginResponse extends BaseResponse {
    token: string
}

type User = {
    readonly id: number,
    username: string,
    nickname?: string,
    email?: string,
    user_pic?: string
}

type UserInfoForm = Pick<User>['id' | 'nickname' | 'email'];

type MenuItem = {
    readonly key: string,
    title?: string,
    label: string,
    icon: ReactNode,
    children?: MenuItem[]
}