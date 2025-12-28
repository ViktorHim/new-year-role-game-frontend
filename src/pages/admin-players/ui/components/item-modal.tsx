import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Package, Plus, Trash2 } from 'lucide-react';
import type { Item, ItemEffect } from './items-manager';

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Item, 'id'>) => void;
    initialData?: Item;
    title: string;
}

export const ItemModal = ({ isOpen, onClose, onSave, initialData, title }: ItemModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [effects, setEffects] = useState<ItemEffect[]>([]);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
            setEffects(initialData.effects || []);
        } else {
            setName('');
            setDescription('');
            setEffects([]);
        }
    }, [initialData, isOpen]);

    const handleAddEffect = () => {
        const newEffect: ItemEffect = {
            id: Math.max(0, ...effects.map((e) => e.id)) + 1,
            resourceType: 'influence',
            amount: 0,
            cooldownMinutes: 60,
        };
        setEffects([...effects, newEffect]);
    };

    const handleRemoveEffect = (id: number) => {
        setEffects(effects.filter((e) => e.id !== id));
    };

    const handleUpdateEffect = (id: number, updates: Partial<ItemEffect>) => {
        setEffects(effects.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    };

    const handleSubmit = () => {
        if (name && description) {
            onSave({ name, description, effects });
            handleClose();
        }
    };

    const handleClose = () => {
        setName('');
        setDescription('');
        setEffects([]);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Измените' : 'Заполните'} информацию о предмете
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4 overflow-y-auto flex-1">
                    <div className="space-y-2">
                        <Label>Название предмета</Label>
                        <Input
                            placeholder="Введите название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Описание</Label>
                        <Input
                            placeholder="Введите описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Эффекты (необязательно)</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddEffect}
                            >
                                <Plus className="w-3 h-3 mr-1" />
                                Добавить эффект
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {effects.map((effect) => (
                                <div
                                    key={effect.id}
                                    className="p-3 border rounded-lg bg-slate-50 space-y-2"
                                >
                                    <div className="flex justify-end">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveEffect(effect.id)}
                                        >
                                            <Trash2 className="w-3 h-3 text-red-600" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Ресурс</Label>
                                            <Select
                                                value={effect.resourceType}
                                                onValueChange={(value: 'influence' | 'money') =>
                                                    handleUpdateEffect(effect.id, {
                                                        resourceType: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="influence">ОВ</SelectItem>
                                                    <SelectItem value="money">Деньги</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs">Количество</Label>
                                            <Input
                                                type="number"
                                                value={effect.amount}
                                                onChange={(e) =>
                                                    handleUpdateEffect(effect.id, {
                                                        amount: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs">Кулдаун (мин)</Label>
                                            <Input
                                                type="number"
                                                value={effect.cooldownMinutes}
                                                onChange={(e) =>
                                                    handleUpdateEffect(effect.id, {
                                                        cooldownMinutes: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button type="button" onClick={handleSubmit} disabled={!name || !description}>
                        {initialData ? 'Сохранить' : 'Создать'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
