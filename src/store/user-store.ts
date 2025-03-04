import { create } from "zustand";
import resetters from "./resetter";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getUserInfo } from "@/api/user-api";

const initState = {
    user: {
        id: 0,
        username: '',
        nickname: '',
        email: '',
        user_pic: ''
    } as User
}

type UserStoreType = typeof initState;

const useUserStore = create<UserStoreType>()(
    immer(
        devtools(
            persist((set) => {
                // add reset function
                resetters.push(() => set(initState))
                return {
                    ...initState
                };
            }, { name: 'user-store' }),
            { name: 'user-store' }
        )
    ))

export const initUser = () => {
    getUserInfo().then(res => {
        if (res.data) {
            useUserStore.setState({ user: res.data as User })
        }
    })
}

export const selectName = (state: UserStoreType) => state.user.nickname || state.user.username;
export const selectAvatar = (state: UserStoreType) => state.user.user_pic;
export const selectUserInfo = (state: UserStoreType) => state.user;

export default useUserStore;