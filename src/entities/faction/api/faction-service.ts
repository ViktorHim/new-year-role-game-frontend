import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type { IFactionResponse } from '../model/types';

const endpoints = {
    GET_FACTION: '/player/faction',
};

export const FactionService = {
    getFaction: (): Promise<AxiosResponse<IFactionResponse>> => {
        return http.get(endpoints.GET_FACTION);
    },
};
