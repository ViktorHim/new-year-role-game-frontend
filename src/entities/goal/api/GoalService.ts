import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type {
    IFactionGoalResponse,
    IPersonalGoalResponse,
    IToggleGoalResponse,
} from '../model/types';

const endpoints = {
    GET_PESONAL_GOALS: '/player/goals',
    GET_FACTION_GOALS: '/player/faction/goals',
    TOGGLE_GOAL: (id: number) => `/goals/${id}/toggle`,
};

export const GoalService = {
    getPersonalGoals: (): Promise<AxiosResponse<{ goals: IPersonalGoalResponse[] }>> => {
        return http.get(endpoints.GET_PESONAL_GOALS);
    },
    getFactionGoals: (): Promise<AxiosResponse<{ goals: IFactionGoalResponse[] }>> => {
        return http.get(endpoints.GET_FACTION_GOALS);
    },
    toggleGoal: (
        id: number,
        is_completed: boolean,
    ): Promise<AxiosResponse<IToggleGoalResponse>> => {
        return http.put(endpoints.TOGGLE_GOAL(id), { is_completed });
    },
};
