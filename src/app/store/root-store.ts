import { createAbilitySlice, type AbilityStore } from '@/entities/ability';
import { createBalanceSlice, type BalanceStore } from '@/entities/balance';
import { createFactionSlice, type FactionStore } from '@/entities/faction';
import { createGoalsSlice, type GoalsStore } from '@/entities/goal';
import { createPlayersSlice, type PlayersStore } from '@/entities/players';
import { createTransferSlice, type TransferStore } from '@/entities/transfer';
import { createAuthSlice, type AuthStore } from '@/features/auth';
import { create, type StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type AppStore = {
    balance: BalanceStore;
    faction: FactionStore;
    goals: GoalsStore;
    auth: AuthStore;
    players: PlayersStore;
    transfer: TransferStore;
    ability: AbilityStore;
};

export type ImmerSlice<T> = StateCreator<AppStore, [['zustand/immer', never]], [], T>;

export const useAppStore = create<AppStore>()(
    immer((...args) => ({
        auth: createAuthSlice(...args),
        balance: createBalanceSlice(...args),
        faction: createFactionSlice(...args),
        goals: createGoalsSlice(...args),
        players: createPlayersSlice(...args),
        transfer: createTransferSlice(...args),
        ability: createAbilitySlice(...args),
    })),
);
