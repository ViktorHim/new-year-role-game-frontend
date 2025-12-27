// features/faction/ui/select-faction-modal.tsx
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
import type { IFactionOption } from '@/entities/faction';

interface SelectFactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    factions: IFactionOption[];
    onSelect: (factionId: number) => void;
    isLoading?: boolean;
}

export const SelectFactionModal = ({
    isOpen,
    onClose,
    factions,
    onSelect,
    isLoading = false,
}: SelectFactionModalProps) => {
    const [selectedFactionId, setSelectedFactionId] = useState<string>('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleSelect = () => {
        if (selectedFactionId) {
            setShowConfirmModal(true);
        }
    };

    const handleConfirm = () => {
        onSelect(Number(selectedFactionId));
        setShowConfirmModal(false);
        handleClose();
    };

    const handleClose = () => {
        setSelectedFactionId('');
        onClose();
    };

    const handleCancelConfirm = () => {
        setShowConfirmModal(false);
    };

    const selectedFaction = factions.find((f) => f.id === Number(selectedFactionId));

    return (
        <>
            {/* Основная модалка выбора */}
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Выбор фракции</DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Выберите фракцию, к которой хотите присоединиться
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <RadioGroup value={selectedFactionId} onValueChange={setSelectedFactionId}>
                            <div className="space-y-3">
                                {factions.map((faction) => (
                                    <div key={faction.id}>
                                        <Label
                                            htmlFor={`faction-${faction.id}`}
                                            className={`
                                                flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all
                                                ${
                                                    selectedFactionId === String(faction.id)
                                                        ? 'border-purple-500 bg-purple-50'
                                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <span
                                                    className={`
                                                        font-semibold
                                                        ${
                                                            selectedFactionId === String(faction.id)
                                                                ? 'text-purple-900'
                                                                : 'text-slate-900'
                                                        }
                                                    `}
                                                >
                                                    {faction.name}
                                                </span>
                                            </div>
                                            <RadioGroupItem
                                                value={String(faction.id)}
                                                id={`faction-${faction.id}`}
                                            />
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>

                        {factions.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-slate-500">Нет доступных фракций</p>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Отмена
                        </Button>
                        <Button type="button" onClick={handleSelect} disabled={!selectedFactionId}>
                            Выбрать
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showConfirmModal} onOpenChange={handleCancelConfirm}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <DialogTitle className="text-xl font-bold">
                                Вы уверены, что хотите перейти в фракцию{' '}
                                <span className="font-semibold text-slate-900">
                                    "{selectedFaction?.name}"
                                </span>
                                ?
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="py-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p className="text-sm text-amber-900 font-medium">
                                Подтвердив выбор, вы не сможете поменять его до конца игры
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancelConfirm}
                            disabled={isLoading}
                        >
                            Отмена
                        </Button>
                        <Button type="button" onClick={handleConfirm} disabled={isLoading}>
                            {isLoading ? 'Подтверждение...' : 'Подтвердить'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
