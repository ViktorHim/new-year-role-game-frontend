import { create } from 'zustand';
import { LocalStorageKeys } from '../../../shared/config';
import { AuthService } from '../api/auth-service';
import type { User } from './types';

interface AuthStore {
    user: User | null;
    isLoading: boolean;
    isAuth: boolean;
    getUser: () => Promise<void>;
    signIn: (login: string) => Promise<void>;
    logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
    user: null,
    isLoading: false,
    isAuth: false,

    getUser: async () => {
        const token = localStorage.getItem(LocalStorageKeys.TOKEN);
        if (!token) {
            set({ isAuth: false, user: null });
            return;
        }

        try {
            set({ isLoading: true });
            const response = await AuthService.getUser();
            set({ isAuth: true, user: response.data });
        } catch {
            set({ isAuth: false, user: null });
        } finally {
            set({ isLoading: false });
        }
    },

    signIn: async (login: string) => {
        try {
            const response = await AuthService.signIn(login);
            localStorage.setItem(LocalStorageKeys.TOKEN, response.data.token);

            const responseUser = await AuthService.getUser();
            set({ isAuth: true, user: responseUser.data });
        } catch {
            set({ isAuth: false, user: null });
        }
    },

    logout: () => {
        localStorage.removeItem(LocalStorageKeys.TOKEN);

        set({ user: null, isAuth: false });
    },
}));
