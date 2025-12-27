import type { IInventoryItem, ITransferItemRequest } from './types';
import { InventoryService } from '../api/inventory-service';
import { inventoryListMapper } from './mappers';
import type { ImmerSlice } from '@/app/store';
import { toast } from 'sonner';

export interface InventoryStore {
    items: IInventoryItem[];
    isLoading: boolean;

    getInventory: () => Promise<void>;
    transferItem: (payload: ITransferItemRequest) => Promise<void>;
}

export const createInventorySlice: ImmerSlice<InventoryStore> = (set, get) => ({
    items: [],
    isLoading: false,

    getInventory: async () => {
        set((state) => {
            state.inventory.isLoading = true;
        });

        try {
            const response = await InventoryService.getInventory();
            const mappedItems = inventoryListMapper(response.data.items);

            set((state) => {
                state.inventory.items = mappedItems;
                state.inventory.isLoading = false;
            });
        } catch {
            set((state) => {
                state.inventory.items = [];
                state.inventory.isLoading = false;
            });
            toast.error('Ошибка загрузки инвентаря');
        }
    },

    transferItem: async (payload: ITransferItemRequest) => {
        try {
            await InventoryService.transferItem(payload);
            toast.success('Предмет успешно передан!');

            await get().inventory.getInventory();
        } catch {
            toast.error('Ошибка передачи предмета');
        }
    },
});
