// entities/ability/api/ability-service.ts
import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type { IAbilitiesResponse, IAbilityUseRequest, IAbilityUseResponse } from '../model/types';

const endpoints = {
    GET_ABILITIES: '/player/abilities',
    USE_ABILITY: (id: number) => `/abilities/${id}/use`,
};

export const AbilityService = {
    getAbilities: (): Promise<AxiosResponse<IAbilitiesResponse>> => {
        return http.get(endpoints.GET_ABILITIES);
    },
    useAbility: (
        ability_id: number,
        payload: IAbilityUseRequest,
    ): Promise<AxiosResponse<IAbilityUseResponse>> => {
        return http.post(endpoints.USE_ABILITY(ability_id), payload);
    },
};
