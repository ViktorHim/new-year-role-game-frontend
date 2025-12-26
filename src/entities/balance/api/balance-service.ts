import type { AxiosResponse } from 'axios';
import type { IBalance } from '../model/types';
import { http } from '@/shared/api';

const endpoints = {
    GET_BALANCE: '/player/balance',
};

export const BalanceService = {
    getBalance: (): Promise<AxiosResponse<IBalance>> => {
        return http.get(endpoints.GET_BALANCE);
    },
};
