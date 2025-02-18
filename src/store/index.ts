import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initStore = {
    token: ''
}

type StoreType = typeof initStore;

const useAppStore = create<StoreType>()(
    immer(
        devtools(
            persist(() => {
                return {
                    ...initStore
                };
            }, { name: 'appstore-persist' })
            , { name: 'appdevtool' }),
    )
);

export const setToken = (token: string) => {
    useAppStore.setState((state) => {
        state.token = token;
    })
}

export default useAppStore;