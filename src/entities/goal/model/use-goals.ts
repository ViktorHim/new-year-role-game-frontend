import { useAppStore } from '@/app/store';
import { useShallow } from 'zustand/shallow';
import type { IGoal } from './types';

export const useGoals = () => useAppStore((state) => state.goals);

const filterGoals = (goals: IGoal[]): IGoal[] => {
    return goals.filter((goal) => {
        return goal.isVisible && !goal.isLocked;
    });
};

export const useAvaiblePersonalGoals = () =>
    useAppStore(useShallow((state) => filterGoals(state.goals.personalGoals)));
