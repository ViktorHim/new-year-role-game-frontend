import { useAppStore } from '@/app/store';

export const useInventory = () => useAppStore((state) => state.inventory);

export const useInventoryItems = () => useAppStore((state) => state.inventory.items);

export const useInventoryLoading = () => useAppStore((state) => state.inventory.isLoading);

export const useInventoryActions = () =>
    useAppStore((state) => ({
        getInventory: state.inventory.getInventory,
        transferItem: state.inventory.transferItem,
    }));
