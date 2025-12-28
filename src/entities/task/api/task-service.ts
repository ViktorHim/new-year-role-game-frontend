import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type { ITaskResponse } from '../model/types';

const endpoints = {
    GET_TASKS: '/player/tasks',
    TOGGLE_TASK: (id: number) => `/tasks/${id}/toggle`,
};

export const TaskService = {
    getTasks: (): Promise<AxiosResponse<{ tasks: ITaskResponse[] }>> => {
        return http.get(endpoints.GET_TASKS);
    },
    toggleTask: (id: number, is_completed: boolean): Promise<AxiosResponse<void>> => {
        return http.put(endpoints.TOGGLE_TASK(id), { is_completed });
    },
};
