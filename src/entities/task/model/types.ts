export interface ITask {
    id: number;
    playerId: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
}

export interface ITaskResponse {
    id: number;
    player_id: number;
    title: string;
    description: string;
    is_completed: boolean;
    created_at: string;
}
