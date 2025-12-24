import { create } from 'zustand';
import { LocalStorageKeys } from '../../../shared/config';
import { AuthService } from '../api/auth-service';
import type { IPlayer } from './types';

interface AuthStore {
    player: IPlayer | null;
    isAdmin: boolean;
    isLoading: boolean;
    isAuth: boolean;
    getUser: () => Promise<void>;
    signIn: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
    player: null,
    isLoading: true,
    isAdmin: false,
    isAuth: false,

    getUser: async () => {
        const token = localStorage.getItem(LocalStorageKeys.TOKEN);
        if (!token) {
            set({ isAuth: false, player: null, isLoading: false });
            return;
        }

        try {
            set({ isLoading: true });
            const response = await AuthService.getUser();
            set({ isAuth: true, player: response.data });
        } catch {
            localStorage.removeItem(LocalStorageKeys.TOKEN);
            localStorage.removeItem(LocalStorageKeys.IS_ADMIN);
            set({ isAuth: false, player: null });
        } finally {
            set({ isLoading: false });
        }
    },

    signIn: async (username: string, password: string) => {
        try {
            const response = await AuthService.signIn(username, password);
            localStorage.setItem(LocalStorageKeys.TOKEN, response.data.token);
            localStorage.setItem(
                LocalStorageKeys.IS_ADMIN,
                JSON.stringify(response?.data?.user?.is_admin || false),
            );

            const responseUser = await AuthService.getUser();
            set({ isAuth: true, player: responseUser.data });
        } catch {
            set({ isAuth: false, player: null });
        }
    },

    logout: () => {
        localStorage.removeItem(LocalStorageKeys.TOKEN);
        localStorage.removeItem(LocalStorageKeys.IS_ADMIN);
        set({ player: null, isAuth: false });
    },
}));
