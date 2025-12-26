import { useAppStore } from '@/app/store';

export const useAuth = () => useAppStore((state) => state.auth);
