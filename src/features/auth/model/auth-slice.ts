import { LocalStorageKeys } from '@/shared/config';
import type { ImmerSlice } from '@/app/store';
import { AuthService } from '../api/auth-service';
import type { IPlayer } from './types';

export interface AuthStore {
    player: IPlayer | null;
    isAdmin: boolean;
    isLoading: boolean;
    isAuth: boolean;
    getUser: () => Promise<void>;
    signIn: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const createAuthSlice: ImmerSlice<AuthStore> = (set, get) => ({
    player: null,
    isLoading: true,
    isAdmin: false,
    isAuth: false,

    getUser: async () => {
        const token = localStorage.getItem(LocalStorageKeys.TOKEN);
        const isAdminStr = localStorage.getItem(LocalStorageKeys.IS_ADMIN);
        const isAdmin = isAdminStr ? JSON.parse(isAdminStr) : false;

        if (!token) {
            set((state) => {
                state.auth.isAuth = false;
                state.auth.isAdmin = false;
                state.auth.player = null;
                state.auth.isLoading = false;
            });
            return;
        }

        if (isAdmin) {
            set((state) => {
                state.auth.isAuth = true;
                state.auth.isAdmin = true;
                state.auth.player = null;
                state.auth.isLoading = false;
            });
            return;
        }

        try {
            set((state) => {
                state.auth.isLoading = true;
            });
            const response = await AuthService.getUser();
            set((state) => {
                state.auth.isAuth = true;
                state.auth.isAdmin = false;
                state.auth.player = response.data;
                state.auth.isLoading = false;
            });
        } catch {
            localStorage.removeItem(LocalStorageKeys.TOKEN);
            localStorage.removeItem(LocalStorageKeys.IS_ADMIN);
            set((state) => {
                state.auth.isAuth = false;
                state.auth.isAdmin = false;
                state.auth.player = null;
                state.auth.isLoading = false;
            });
        }
    },

    signIn: async (username: string, password: string) => {
        try {
            const response = await AuthService.signIn(username, password);
            const isAdmin = response?.data?.user?.is_admin || false;

            localStorage.setItem(LocalStorageKeys.TOKEN, response.data.token);
            localStorage.setItem(LocalStorageKeys.IS_ADMIN, JSON.stringify(isAdmin));

            get().auth.getUser();
        } catch {
            set((state) => {
                state.auth.isAdmin = false;
                state.auth.isAuth = false;
                state.auth.player = null;
                state.auth.isLoading = false;
            });
        }
    },

    logout: () => {
        localStorage.removeItem(LocalStorageKeys.TOKEN);
        localStorage.removeItem(LocalStorageKeys.IS_ADMIN);
        set((state) => {
            state.auth.player = null;
            state.auth.isAuth = false;
            state.auth.isAdmin = false;
            state.auth.isLoading = false;
        });
    },
});
