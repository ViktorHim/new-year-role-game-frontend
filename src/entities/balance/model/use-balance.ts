import { useAppStore } from '@/app/store';

export const useBalance = () => useAppStore((state) => state.balance);
