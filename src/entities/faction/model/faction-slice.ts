import type { IFactionResponse } from './types';
import { FactionService } from '../api/faction-service';
import type { ImmerSlice } from '@/app/store';

export interface FactionStore {
    factionInfo: IFactionResponse | null;
    isLoading: boolean;

    getFaction: () => Promise<void>;
}

export const createFactionSlice: ImmerSlice<FactionStore> = (set) => ({
    isLoading: false,
    factionInfo: null,

    getFaction: async () => {
        set((state) => {
            state.faction.isLoading = true;
        });
        try {
            const response = await FactionService.getFaction();
            set((state) => {
                state.faction.factionInfo = response.data;
            });
        } finally {
            set((state) => {
                state.faction.isLoading = false;
            });
        }
    },
});
