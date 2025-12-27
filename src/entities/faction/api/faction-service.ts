import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type { IChangeFactionPayload, IFactionResponse } from '../model/types';

const endpoints = {
    FACTION: '/player/faction',
    FACTION_LIST: '/factions',
};

export const FactionService = {
    getFaction: (): Promise<AxiosResponse<IFactionResponse | { faction: null }>> => {
        return http.get(endpoints.FACTION);
    },
    changeFaction: (payload: IChangeFactionPayload): Promise<AxiosResponse<void>> => {
        return http.put(endpoints.FACTION, payload);
    },
    getFactionList: (): Promise<AxiosResponse<{ factions: IFactionResponse[] }>> => {
        return http.get(endpoints.FACTION_LIST);
    },
};
