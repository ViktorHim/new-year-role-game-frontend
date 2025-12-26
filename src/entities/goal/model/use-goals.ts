import { useAppStore } from '@/app/store';

export const useGoals = () => useAppStore((state) => state.goals);
