import { useAppStore } from '@/app/store';

export const useTasks = () => useAppStore((state) => state.task);
