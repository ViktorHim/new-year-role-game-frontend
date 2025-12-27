// entities/inventory/ui/inventory-item-card.tsx
import { Button } from '@/shared/ui/button';
import { Package, Info } from 'lucide-react';
import type { IInventoryItem } from '../model/types';

interface InventoryItemCardProps {
    item: IInventoryItem;
    onOpenDetails: (item: IInventoryItem) => void;
}

export const InventoryItemCard = ({ item, onOpenDetails }: InventoryItemCardProps) => {
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-4 flex gap-4">
            <div className="w-24 h-24 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-12 h-12 text-amber-600" />
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                </div>

                <div className="mt-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenDetails(item)}
                        className="w-full sm:w-auto"
                    >
                        <Info className="w-4 h-4 mr-2" />
                        Подробнее
                    </Button>
                </div>
            </div>
        </div>
    );
};
