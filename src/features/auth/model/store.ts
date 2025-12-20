import { create } from "zustand";
import { LocalStorageKeys } from "../../../shared/config";

interface AuthStore {
    user: string | null;
    isLoading: boolean;
    isAuth: boolean;
    getUser: () => void;
    signIn: () => void;
    logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
    user: null,
    isLoading: false,
    isAuth: false,

    getUser: () => {
        set({user: null})
    },

    signIn: () => {
        localStorage.setItem(LocalStorageKeys.TOKEN, '');
        set({isAuth: true})
    },

    logout: () => {
        localStorage.removeItem(LocalStorageKeys.TOKEN);

        set({user: null, isAuth: false})
    }
}))