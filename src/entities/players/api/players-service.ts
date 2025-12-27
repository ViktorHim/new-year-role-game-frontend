import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type { IPlayerInfo } from '../model/types';

const endpoints = {
    GET_PLAYER_LIST: '/players',
};

export const PlayersService = {
    getPlayerList: (): Promise<AxiosResponse<{ players: IPlayerInfo[] }>> => {
        return http.get(endpoints.GET_PLAYER_LIST);
    },
};
