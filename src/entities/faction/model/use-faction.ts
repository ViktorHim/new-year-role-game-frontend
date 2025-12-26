import { useAppStore } from '@/app/store';

export const useFaction = () => useAppStore((state) => state.faction);
