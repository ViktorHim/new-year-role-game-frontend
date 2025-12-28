import { createAbilitySlice, type AbilityStore } from '@/entities/ability';
import { createAdminSlice, type AdminStore } from '@/entities/admin';
import { createBalanceSlice, type BalanceStore } from '@/entities/balance';
import { createContractSlice, type ContractStore } from '@/entities/contract';
import { createFactionSlice, type FactionStore } from '@/entities/faction';
import { createGoalsSlice, type GoalsStore } from '@/entities/goal';
import { createInventorySlice, type InventoryStore } from '@/entities/inventory';
import { createPlayersSlice, type PlayersStore } from '@/entities/players';
import { createTaskSlice, type TaskStore } from '@/entities/task';
import { createAuthSlice, type AuthStore } from '@/features/auth';
import { create, type StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type AppStore = {
    balance: BalanceStore;
    faction: FactionStore;
    goals: GoalsStore;
    auth: AuthStore;
    players: PlayersStore;
    ability: AbilityStore;
    inventory: InventoryStore;
    contract: ContractStore;
    task: TaskStore;
    admin: AdminStore;
};

export type ImmerSlice<T> = StateCreator<AppStore, [['zustand/immer', never]], [], T>;

export const useAppStore = create<AppStore>()(
    immer((...args) => ({
        auth: createAuthSlice(...args),
        balance: createBalanceSlice(...args),
        faction: createFactionSlice(...args),
        goals: createGoalsSlice(...args),
        players: createPlayersSlice(...args),
        ability: createAbilitySlice(...args),
        inventory: createInventorySlice(...args),
        contract: createContractSlice(...args),
        task: createTaskSlice(...args),
        admin: createAdminSlice(...args),
    })),
);
