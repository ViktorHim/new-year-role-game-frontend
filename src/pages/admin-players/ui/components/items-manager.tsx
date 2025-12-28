import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';
import { ItemCard } from './item-card';
import { ItemModal } from './item-modal';
import { DeleteConfirmModal } from './delete-confirm-modal';

export interface Item {
    id: number;
    name: string;
    description: string;
    effects?: ItemEffect[];
}

export interface ItemEffect {
    id: number;
    resourceType: 'influence' | 'money';
    amount: number;
    cooldownMinutes: number;
}

interface ItemsManagerProps {
    items: Item[];
    onUpdate: (items: Item[]) => void;
}

export const ItemsManager = ({ items, onUpdate }: ItemsManagerProps) => {
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = (data: Omit<Item, 'id'>) => {
        const newItem: Item = {
            ...data,
            id: Math.max(0, ...items.map((i) => i.id)) + 1,
        };
        onUpdate([...items, newItem]);
        setIsCreating(false);
    };

    const handleEdit = (data: Omit<Item, 'id'>) => {
        if (editingItem) {
            onUpdate(items.map((item) => (item.id === editingItem.id ? { ...data, id: editingItem.id } : item)));
            setEditingItem(null);
        }
    };

    const handleDelete = () => {
        if (deletingItemId !== null) {
            onUpdate(items.filter((item) => item.id !== deletingItemId));
            setDeletingItemId(null);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Предметы</CardTitle>
                <CardDescription>Управление инвентарем игрока</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onEdit={() => setEditingItem(item)}
                            onDelete={() => setDeletingItemId(item.id)}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setIsCreating(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить предмет
                </Button>

                <ItemModal
                    isOpen={isCreating}
                    onClose={() => setIsCreating(false)}
                    onSave={handleCreate}
                    title="Создать предмет"
                />

                <ItemModal
                    isOpen={editingItem !== null}
                    onClose={() => setEditingItem(null)}
                    onSave={handleEdit}
                    initialData={editingItem || undefined}
                    title="Редактировать предмет"
                />

                <DeleteConfirmModal
                    isOpen={deletingItemId !== null}
                    onClose={() => setDeletingItemId(null)}
                    onConfirm={handleDelete}
                    title="Удалить предмет?"
                    description="Это действие нельзя будет отменить."
                />
            </CardContent>
        </Card>
    );
};
