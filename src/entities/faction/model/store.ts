import { create } from 'zustand';
import type { IFactionResponse } from './types';
import { FactionService } from '../api/faction-service';

interface FactionStore {
    factionInfo: IFactionResponse | null;
    isLoading: boolean;

    getFaction: () => Promise<void>;
}

export const useFaction = create<FactionStore>((set) => ({
    isLoading: false,
    factionInfo: null,

    getFaction: async () => {
        set({ isLoading: true });
        try {
            const response = await FactionService.getFaction();
            set({ factionInfo: response.data });
        } finally {
            set({ isLoading: false });
        }
    },
}));
