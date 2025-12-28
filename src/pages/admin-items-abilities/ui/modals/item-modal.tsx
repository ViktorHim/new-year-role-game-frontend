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
import { Package } from 'lucide-react';
import type { IAdminItem } from '@/entities/admin';

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; description: string }) => void;
    item?: IAdminItem | null;
}

export const ItemModal = ({ isOpen, onClose, onSave, item }: ItemModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [item, isOpen]);

    const handleSubmit = () => {
        if (name && description) {
            onSave({ name, description });
            handleClose();
        }
    };

    const handleClose = () => {
        setName('');
        setDescription('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {item ? 'Редактировать предмет' : 'Создать предмет'}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500">
                        {item
                            ? 'Измените информацию о предмете'
                            : 'Укажите название и описание нового предмета'}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Название предмета *
                        </Label>
                        <Input
                            placeholder="Введите название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Описание *</Label>
                        <Textarea
                            placeholder="Введите описание предмета"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button type="button" onClick={handleSubmit} disabled={!name || !description}>
                        {item ? 'Сохранить' : 'Создать предмет'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
