import type { IFactionGoalResponse, IGoal, IPersonalGoalResponse } from './types';

export const goalsResponseMapper = (
    raw: IPersonalGoalResponse[] | IFactionGoalResponse[],
): IGoal[] => {
    if (!raw || raw.length === 0) return [];
    return raw
        .map((rawGoal) => ({
            id: rawGoal.id,
            isCompleted: rawGoal.is_completed,
            description: rawGoal.description,
            reward: rawGoal.influence_points_reward,
            isLocked: rawGoal.is_locked,
            isVisible: rawGoal.is_visible,
        }))
        .sort((a, b) => a.id - b.id); // Sort by ascending ID
};
