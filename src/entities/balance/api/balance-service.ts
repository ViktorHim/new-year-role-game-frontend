import type { AxiosResponse } from 'axios';
import type { IBalance, ITransferMoneyPayload, ITransferMoneyResponse } from '../model/types';
import { http } from '@/shared/api';

const endpoints = {
    GET_BALANCE: '/player/balance',
    TRANSFER_MONEY: '/player/transfer/money',
};

export const BalanceService = {
    getBalance: (): Promise<AxiosResponse<IBalance>> => {
        return http.get(endpoints.GET_BALANCE);
    },
    transferMoney: (
        payload: ITransferMoneyPayload,
    ): Promise<AxiosResponse<ITransferMoneyResponse>> => {
        return http.post(endpoints.TRANSFER_MONEY, payload);
    },
};
