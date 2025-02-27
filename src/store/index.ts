import resetters from "@/store/resetter";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initStore = {
    token: '',
    collapsed: false,
}

type StoreType = typeof initStore;

const useAppStore = create<StoreType>()(
    immer(
        devtools(
            // inject resetter
            persist((set) => {
                resetters.push(() => set(initStore))
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

export const switchCollapsed = () => {
    useAppStore.setState(state => {
        state.collapsed = !state.collapsed
    })
}

export const selectCollapsed = (state: StoreType) => state.collapsed;
export const selectToken = (state: StoreType) => state.token;

export default useAppStore;