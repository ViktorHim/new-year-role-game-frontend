import type { ITask, ITaskResponse } from './types';

export const tasksResponseMapper = (raw: ITaskResponse[]): ITask[] => {
    if (!raw || raw.length === 0) return [];
    return raw.map((rawTask) => ({
        id: rawTask.id,
        playerId: rawTask.player_id,
        title: rawTask.title,
        description: rawTask.description,
        isCompleted: rawTask.is_completed,
        createdAt: rawTask.created_at,
    }));
};
