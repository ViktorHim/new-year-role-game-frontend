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
import { Target } from 'lucide-react';
import type { Goal } from './goals-manager';

interface GoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Goal, 'id'>) => void;
    allGoals: Goal[];
    initialData?: Goal;
    title: string;
}

export const GoalModal = ({ isOpen, onClose, onSave, allGoals, initialData, title }: GoalModalProps) => {
    const [description, setDescription] = useState('');
    const [dependsOnId, setDependsOnId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (initialData) {
            setDescription(initialData.description);
            setDependsOnId(initialData.dependsOnId);
        } else {
            setDescription('');
            setDependsOnId(undefined);
        }
    }, [initialData, isOpen]);

    const handleSubmit = () => {
        if (description) {
            onSave({
                description,
                isCompleted: initialData?.isCompleted || false,
                dependsOnId: dependsOnId,
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setDescription('');
        setDependsOnId(undefined);
        onClose();
    };

    const availableGoals = allGoals.filter((g) => g.id !== initialData?.id);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Измените' : 'Заполните'} информацию о цели
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Описание цели</Label>
                        <Input
                            placeholder="Введите описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Зависит от цели (необязательно)</Label>
                        <Select
                            value={dependsOnId?.toString() || 'none'}
                            onValueChange={(value) =>
                                setDependsOnId(value === 'none' ? undefined : Number(value))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Нет зависимости" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Нет зависимости</SelectItem>
                                {availableGoals.map((goal) => (
                                    <SelectItem key={goal.id} value={goal.id.toString()}>
                                        {goal.description}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-slate-500">
                            Эта цель станет доступна только после выполнения выбранной цели
                        </p>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button type="button" onClick={handleSubmit} disabled={!description}>
                        {initialData ? 'Сохранить' : 'Создать'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
