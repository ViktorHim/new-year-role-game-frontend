import type { IGoal } from './types';
import { GoalService } from '../api/GoalService';
import { goalsResponseMapper } from './mappers';
import type { ImmerSlice } from '@/app/store';

export interface GoalsStore {
    personalGoals: IGoal[];
    factionGoals: IGoal[];
    isPersonalLoading: boolean;
    isFactionLoading: boolean;

    getPersonalGoals: () => Promise<void>;
    getFactionGoals: () => Promise<void>;
    togglePersonalGoal: (id: number, isCompleted: boolean) => Promise<void>;
    toggleFactionGoal: (id: number, isCompleted: boolean) => Promise<void>;
}

export const createGoalsSlice: ImmerSlice<GoalsStore> = (set, get) => ({
    isPersonalLoading: false,
    isFactionLoading: false,
    personalGoals: [],
    factionGoals: [],

    getPersonalGoals: async () => {
        set((state) => {
            state.goals.isPersonalLoading = true;
        });

        try {
            const response = await GoalService.getPersonalGoals();
            set((state) => {
                state.goals.personalGoals = goalsResponseMapper(response.data?.goals);
                state.goals.isPersonalLoading = false;
            });
        } catch {
            set((state) => {
                state.goals.isPersonalLoading = false;
            });
        }
    },

    getFactionGoals: async () => {
        set((state) => {
            state.goals.isFactionLoading = true;
        });

        try {
            const response = await GoalService.getFactionGoals();
            set((state) => {
                state.goals.factionGoals = goalsResponseMapper(response.data?.goals);
                state.goals.isFactionLoading = false;
            });
        } catch {
            set((state) => {
                state.goals.isFactionLoading = false;
            });
        }
    },

    togglePersonalGoal: async (id, isCompleted) => {
        const previousGoals = get().goals.personalGoals;

        set((state) => {
            state.goals.personalGoals = state.goals.personalGoals.map((goal) =>
                goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal,
            );
        });

        try {
            const response = await GoalService.toggleGoal(id, isCompleted);
            get().balance.chageInfluence(response.data.influence_change);
        } catch {
            set((state) => {
                state.goals.personalGoals = previousGoals;
            });
        }
    },

    toggleFactionGoal: async (id, isCompleted) => {
        const previousGoals = get().goals.factionGoals;

        set((state) => {
            state.goals.factionGoals = state.goals.factionGoals.map((goal) =>
                goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal,
            );
        });

        try {
            await GoalService.toggleGoal(id, isCompleted);
        } catch {
            set((state) => {
                state.goals.factionGoals = previousGoals;
            });
        }
    },
});
