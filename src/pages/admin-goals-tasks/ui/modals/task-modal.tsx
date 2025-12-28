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
import { Textarea } from '@/shared/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { ListTodo, FileText, Hash, Award, Coins } from 'lucide-react';
import type { ITaskBlock } from '@/entities/admin';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    title: string;
    taskBlocks: ITaskBlock[];
    initialData?: {
        task_block_id: number;
        title: string;
        description: string;
        task_order: number;
        influence_points_reward: number;
        money_reward: number;
    };
    isEdit?: boolean;
}

export const TaskModal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    taskBlocks,
    initialData,
    isEdit,
}: TaskModalProps) => {
    const [taskBlockId, setTaskBlockId] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskOrder, setTaskOrder] = useState('1');
    const [influenceReward, setInfluenceReward] = useState('50');
    const [moneyReward, setMoneyReward] = useState('100');

    useEffect(() => {
        if (initialData) {
            setTaskBlockId(initialData.task_block_id.toString());
            setTaskTitle(initialData.title);
            setDescription(initialData.description);
            setTaskOrder(initialData.task_order.toString());
            setInfluenceReward(initialData.influence_points_reward.toString());
            setMoneyReward(initialData.money_reward.toString());
        } else {
            setTaskBlockId('');
            setTaskTitle('');
            setDescription('');
            setTaskOrder('1');
            setInfluenceReward('50');
            setMoneyReward('100');
        }
    }, [initialData, isOpen]);

    const handleSubmit = () => {
        if (!taskTitle || !description || !taskOrder || !influenceReward || !moneyReward) return;

        const data: any = {
            title: taskTitle,
            description,
            task_order: parseInt(taskOrder),
            influence_points_reward: parseInt(influenceReward),
            money_reward: parseInt(moneyReward),
        };

        if (!isEdit && taskBlockId) {
            data.task_block_id = parseInt(taskBlockId);
        }

        onSubmit(data);
        handleClose();
    };

    const handleClose = () => {
        setTaskBlockId('');
        setTaskTitle('');
        setDescription('');
        setTaskOrder('1');
        setInfluenceReward('50');
        setMoneyReward('100');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Укажите параметры задачи
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                    {!isEdit && (
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">
                                Блок задач *
                            </Label>
                            <Select value={taskBlockId} onValueChange={setTaskBlockId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите блок" />
                                </SelectTrigger>
                                <SelectContent>
                                    {taskBlocks.map((block) => (
                                        <SelectItem key={block.id} value={block.id.toString()}>
                                            {block.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <ListTodo className="w-4 h-4" />
                            Название задачи *
                        </Label>
                        <Input
                            placeholder="Например: Пройти обучение"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Описание *
                        </Label>
                        <Textarea
                            placeholder="Опишите задачу подробнее..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            Порядок (номер) *
                        </Label>
                        <Input
                            type="number"
                            min="1"
                            placeholder="1"
                            value={taskOrder}
                            onChange={(e) => setTaskOrder(e.target.value)}
                        />
                        <p className="text-xs text-slate-500">
                            Определяет порядок отображения задач в блоке
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                Награда ОВ *
                            </Label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="50"
                                value={influenceReward}
                                onChange={(e) => setInfluenceReward(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Coins className="w-4 h-4" />
                                Награда ₽ *
                            </Label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="100"
                                value={moneyReward}
                                onChange={(e) => setMoneyReward(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={
                            !taskTitle ||
                            !description ||
                            !taskOrder ||
                            !influenceReward ||
                            !moneyReward ||
                            (!isEdit && !taskBlockId)
                        }
                    >
                        {isEdit ? 'Сохранить' : 'Создать'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
