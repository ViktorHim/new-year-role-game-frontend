export interface IGoal {
    id: number;
    description: string;
    isCompleted: boolean;
    reward: number;
}

export type GoalType = 'personal' | 'faction';
export interface IPersonalGoalResponse {
    id: number;
    title: string;
    description: string;
    goal_type: string;
    influence_points_reward: number;
    player_id: number;
    is_completed: boolean;
    created_at: string;
    is_visible: boolean;
    is_locked: boolean;
}

export interface IFactionGoalResponse extends Omit<IPersonalGoalResponse, 'player_id'> {
    faction_id: number;
}

export interface IToggleGoalResponse {
    influence_change: number;
    message: string;
}
