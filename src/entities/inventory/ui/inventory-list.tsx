// entities/inventory/ui/inventory-list.tsx
import { InventoryItemCard } from './inventory-item-card';
import type { IInventoryItem } from '../model/types';
import { Package } from 'lucide-react';

interface InventoryListProps {
    items: IInventoryItem[];
    onOpenDetails: (item: IInventoryItem) => void;
}

export const InventoryList = ({ items, onOpenDetails }: InventoryListProps) => {
    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500">Ваш инвентарь пуст</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <InventoryItemCard key={item.id} item={item} onOpenDetails={onOpenDetails} />
            ))}
        </div>
    );
};
