import type { ImmerSlice } from '@/app/store';
import type { ITransferItemPayload, ITransferMoneyPayload } from './types';
import { TransferService } from '../api/transfer-service';

export interface TransferStore {
    isTransferLoading: boolean;
    transferMoney: (payload: ITransferMoneyPayload) => Promise<void>;
    transferItem: (payload: ITransferItemPayload) => Promise<void>;
}

export const createTransferSlice: ImmerSlice<TransferStore> = (set, get) => ({
    isTransferLoading: false,

    transferMoney: async (payload) => {
        set((state) => {
            state.transfer.isTransferLoading = true;
        });

        try {
            const response = await TransferService.transferMoney(payload);
            set((state) => {
                state.transfer.isTransferLoading = false;
            });
            get().balance.changeBalance(-response.data.amount);
        } catch {
            set((state) => {
                state.transfer.isTransferLoading = false;
            });
        }
    },

    transferItem: async (payload) => {
        set((state) => {
            state.transfer.isTransferLoading = true;
        });

        try {
            await TransferService.transferItem(payload);
            set((state) => {
                state.transfer.isTransferLoading = false;
            });
        } catch {
            set((state) => {
                state.transfer.isTransferLoading = false;
            });
        }
    },
});
