import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type {
    IInventoryResponse,
    ITransferItemRequest,
    ITransferItemResponse,
} from '../model/types';

const endpoints = {
    GET_INVENTORY: '/player/inventory',
    TRANSFER_ITEM: '/player/transfer/item',
};

export const InventoryService = {
    getInventory: (): Promise<AxiosResponse<IInventoryResponse>> => {
        return http.get(endpoints.GET_INVENTORY);
    },

    transferItem: (
        payload: ITransferItemRequest,
    ): Promise<AxiosResponse<ITransferItemResponse>> => {
        return http.post(endpoints.TRANSFER_ITEM, payload);
    },
};
