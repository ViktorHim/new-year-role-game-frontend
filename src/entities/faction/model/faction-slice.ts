// entities/faction/model/faction-slice.ts
import type { IChangeFactionPayload, IFaction, IFactionOption } from './types';
import { FactionService } from '../api/faction-service';
import { factionMapper, factionsListMapper } from './mappers';
import type { ImmerSlice } from '@/app/store';
import { toast } from 'sonner';

export interface FactionStore {
    myFactionInfo: IFaction | null;
    otherFactionsInfo: IFaction[];
    factionOptionList: IFactionOption[];
    isMyFactionLoading: boolean;
    isFactionsListLoading: boolean;

    getMyFaction: () => Promise<void>;
    getFactionList: () => Promise<void>;
    changeFaction: (payload: IChangeFactionPayload) => Promise<void>;
}

export const createFactionSlice: ImmerSlice<FactionStore> = (set, get) => ({
    isMyFactionLoading: false,
    isFactionsListLoading: false,
    factionOptionList: [],
    myFactionInfo: null,
    otherFactionsInfo: [],

    getMyFaction: async () => {
        set((state) => {
            state.faction.isMyFactionLoading = true;
        });

        try {
            const response = await FactionService.getFaction();
            let myFaction = null;
            if (!('faction' in response.data)) {
                myFaction = factionMapper(response.data);
            }

            set((state) => {
                state.faction.myFactionInfo = myFaction;
                state.faction.isMyFactionLoading = false;
            });
        } catch {
            set((state) => {
                state.faction.myFactionInfo = null;
                state.faction.isMyFactionLoading = false;
            });
        }
    },

    getFactionList: async () => {
        set((state) => {
            state.faction.isFactionsListLoading = true;
        });

        try {
            const [myFactionResponse, factionsResponse] = await Promise.all([
                FactionService.getFaction(),
                FactionService.getFactionList(),
            ]);
            let myFaction = null;
            if (!('faction' in myFactionResponse.data)) {
                myFaction = factionMapper(myFactionResponse.data);
            }
            const allFactions = factionsListMapper(factionsResponse.data.factions);

            const otherFactions = allFactions.filter((faction) => faction.id !== myFaction?.id);

            set((state) => {
                state.faction.myFactionInfo = myFaction;
                state.faction.otherFactionsInfo = otherFactions;
                state.faction.factionOptionList = allFactions.map(({ id, name }) => ({ id, name }));
                state.faction.isFactionsListLoading = false;
            });
        } catch {
            set((state) => {
                state.faction.myFactionInfo = null;
                state.faction.otherFactionsInfo = [];
                state.faction.isFactionsListLoading = false;
            });
        }
    },

    changeFaction: async (payload) => {
        try {
            await FactionService.changeFaction(payload);
            await get().faction.getFactionList();
            await get().goals.getFactionGoals();
            toast.success('Фракция успешно изменена');
        } catch {
            toast.error('Неудалось сменить фракцию');
        }
    },
});
