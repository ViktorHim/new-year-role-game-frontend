import { useAppStore } from '@/app/store';

export const useTransfer = () => useAppStore((state) => state.transfer);
