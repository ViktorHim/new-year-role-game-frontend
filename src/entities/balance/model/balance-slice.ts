import type { IBalance } from './types';
import { BalanceService } from '../api/balance-service';
import type { ImmerSlice } from '@/app/store';
import { toast } from 'sonner';

export interface BalanceStore extends IBalance {
    isLoading: boolean;
    getBalance: () => Promise<void>;
    chageInfluence: (amount: number) => void;
    changeBalance: (amount: number) => void;
}

export const createBalanceSlice: ImmerSlice<BalanceStore> = (set) => ({
    money: 0,
    influence: 0,
    isLoading: false,

    chageInfluence: (amount) => {
        if (!amount) return;
        set((state) => {
            state.balance.influence += amount;
            toast(amount);
        });
    },

    changeBalance: (amount) => {
        if (!amount) return;
        set((state) => {
            state.balance.money += amount;
            toast(amount);
        });
    },

    getBalance: async () => {
        set((state) => {
            state.balance.isLoading = true;
        });

        try {
            const response = await BalanceService.getBalance();
            set((state) => {
                state.balance.money = response.data.money;
                state.balance.influence = response.data.influence;
                state.balance.isLoading = false;
            });
        } catch {
            set((state) => {
                state.balance.money = 0;
                state.balance.influence = 0;
                state.balance.isLoading = false;
            });
        }
    },
});
