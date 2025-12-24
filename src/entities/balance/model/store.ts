import { create } from 'zustand';
import type { IBalance } from './types';
import { BalanceService } from '../api/balance-service';

interface BalanceStore extends IBalance {
    getBalance: () => Promise<void>;
    isLoading: boolean;
}

export const useBalance = create<BalanceStore>((set) => ({
    money: 0,
    influence: 0,
    isLoading: false,
    getBalance: async () => {
        set({ isLoading: true });
        try {
            const response = await BalanceService.getBalance();
            set(response.data);
        } catch {
            set({ money: 0, influence: 0 });
        } finally {
            set({ isLoading: false });
        }
    },
}));
