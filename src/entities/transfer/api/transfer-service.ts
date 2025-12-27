import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type {
    ITransferItemPayload,
    ITransferItemResponse,
    ITransferMoneyPayload,
    ITransferMoneyResponse,
} from '../model/types';

const endpoints = {
    TRANSFER_ITEM: '/player/transfer/item',
    TRANSFER_MONEY: '/player/transfer/money',
};

export const TransferService = {
    transferMoney: (
        payload: ITransferMoneyPayload,
    ): Promise<AxiosResponse<ITransferMoneyResponse>> => {
        return http.post(endpoints.TRANSFER_MONEY, payload);
    },
    transferItem: (
        payload: ITransferItemPayload,
    ): Promise<AxiosResponse<ITransferItemResponse>> => {
        return http.post(endpoints.TRANSFER_ITEM, payload);
    },
};
