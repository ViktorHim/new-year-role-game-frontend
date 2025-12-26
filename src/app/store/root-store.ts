import { createBalanceSlice, type BalanceStore } from '@/entities/balance';
import { createFactionSlice, type FactionStore } from '@/entities/faction';
import { createGoalsSlice, type GoalsStore } from '@/entities/goal';
import { createAuthSlice, type AuthStore } from '@/features/auth';
import { create, type StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type AppStore = {
    balance: BalanceStore;
    faction: FactionStore;
    goals: GoalsStore;
    auth: AuthStore;
};

export type ImmerSlice<T> = StateCreator<AppStore, [['zustand/immer', never]], [], T>;

export const useAppStore = create<AppStore>()(
    immer((...args) => ({
        auth: createAuthSlice(...args),
        balance: createBalanceSlice(...args),
        faction: createFactionSlice(...args),
        goals: createGoalsSlice(...args),
    })),
);
