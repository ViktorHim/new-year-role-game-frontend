import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Label } from '@/shared/ui/label';
import { Info, Eye } from 'lucide-react';
import type { RevealInfoType } from '../model/types';

const INFO_CATEGORIES = [
    { value: 'faction' as RevealInfoType, label: 'Фракция', description: 'Узнать фракцию игрока' },
    { value: 'goal' as RevealInfoType, label: 'Цель', description: 'Узнать текущую цель игрока' },
    { value: 'item' as RevealInfoType, label: 'Предмет', description: 'Узнать предметы игрока' },
];

interface RevealInfoModalProps {
    contractId: number | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (contractId: number, infoCategory: RevealInfoType) => void;
    isLoading?: boolean;
}

export const RevealInfoModal = ({
    contractId,
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
}: RevealInfoModalProps) => {
    const [selectedInfoCategory, setSelectedInfoCategory] = useState<RevealInfoType>('faction');

    const handleSubmit = () => {
        if (contractId) {
            onConfirm(contractId, selectedInfoCategory);
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedInfoCategory('faction');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Eye className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold">Узнать факт</DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Выберите категорию информации для раскрытия
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Категория информации
                        </Label>
                        <RadioGroup
                            value={selectedInfoCategory}
                            onValueChange={(value) =>
                                setSelectedInfoCategory(value as RevealInfoType)
                            }
                        >
                            <div className="space-y-2">
                                {INFO_CATEGORIES.map((category) => (
                                    <div key={category.value}>
                                        <Label
                                            htmlFor={`category-${category.value}`}
                                            className={`
                                                flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all
                                                ${
                                                    selectedInfoCategory === category.value
                                                        ? 'border-purple-500 bg-purple-50'
                                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                }
                                            `}
                                        >
                                            <div className="flex-1">
                                                <div className="font-semibold text-sm text-slate-900">
                                                    {category.label}
                                                </div>
                                                <div className="text-xs text-slate-500 mt-0.5">
                                                    {category.description}
                                                </div>
                                            </div>
                                            <RadioGroupItem
                                                indicatorClassname="fill-purple-500"
                                                value={category.value}
                                                id={`category-${category.value}`}
                                            />
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Отмена
                    </Button>
                    <Button type="button" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Раскрытие...' : 'Узнать факт'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
