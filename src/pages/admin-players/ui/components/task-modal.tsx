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
import { CheckSquare } from 'lucide-react';
import type { Task } from './tasks-manager';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (description: string) => void;
    initialData?: Task;
    title: string;
}

export const TaskModal = ({ isOpen, onClose, onSave, initialData, title }: TaskModalProps) => {
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setDescription(initialData.description);
        } else {
            setDescription('');
        }
    }, [initialData, isOpen]);

    const handleSubmit = () => {
        if (description) {
            onSave(description);
            handleClose();
        }
    };

    const handleClose = () => {
        setDescription('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CheckSquare className="w-5 h-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Измените' : 'Введите'} описание задачи
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="space-y-2">
                        <Label>Описание задачи</Label>
                        <Input
                            placeholder="Введите описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
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
