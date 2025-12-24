import type { AxiosResponse } from 'axios';
import type { IBalance } from '../model/types';
import { http } from '@/shared/api';
import { data } from 'react-router';

const endpoints = {
    GET_BALANCE: '/player/balance',
};

export const BalanceService = {
    getBalance: (): Promise<AxiosResponse<IBalance>> => {
        // return http.get(endpoints.GET_BALANCE);
        return Promise.resolve({ data: { influence: 10, money: 3000 } });
    },
};
