import type { AxiosResponse } from 'axios';
import { http } from '@shared/api';
import type { User } from '../model/types';

const endpoints = {
    signIn: '/sign-in',
    user: '/user',
};

export const AuthService = {
    getUser: (): Promise<AxiosResponse<User>> => {
        // return http.get(endpoints.user);
        return Promise.resolve({ data: { id: 1, role: 1, name: 'Я вахуе', game_role: 'Врач' } });
    },
    signIn: (login: string): Promise<AxiosResponse<{ token: string }>> => {
        // return http.post(endpoints.signIn, {login});
        return Promise.resolve({ data: { token: 'token' } });
    },
};
