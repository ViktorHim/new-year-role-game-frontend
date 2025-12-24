import type { AxiosResponse } from 'axios';
import { http } from '@shared/api';
import type { IPlayer, ISignInResponse } from '../model/types';

const endpoints = {
    signIn: '/auth/login',
    user: '/player/me',
};

export const AuthService = {
    getUser: (): Promise<AxiosResponse<IPlayer>> => {
        return http.get(endpoints.user);
    },
    signIn: (username: string, password: string): Promise<AxiosResponse<ISignInResponse>> => {
        return http.post(endpoints.signIn, { username, password });
    },
};
