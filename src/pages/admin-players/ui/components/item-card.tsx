import { Button } from '@/shared/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import type { Item } from './items-manager';

interface ItemCardProps {
    item: Item;
    onEdit: () => void;
    onDelete: () => void;
}

export const ItemCard = ({ item, onEdit, onDelete }: ItemCardProps) => {
    return (
        <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900">{item.name}</h4>
                    <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                    {item.effects && item.effects.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {item.effects.map((effect) => (
                                <span
                                    key={effect.id}
                                    className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                                >
                                    {effect.resourceType === 'influence' ? 'ОВ' : '₽'} +{effect.amount}
                                    {' '}(каждые {effect.cooldownMinutes} мин)
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={onEdit}>
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onDelete}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
