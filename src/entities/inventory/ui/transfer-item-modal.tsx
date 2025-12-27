// entities/inventory/ui/transfer-item-modal.tsx
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
import { Label } from '@/shared/ui/label';
import { Send, User } from 'lucide-react';
import type { IInventoryItem } from '../model/types';
import { PlayerSelect } from '@/entities/players';

interface TransferItemModalProps {
    item: IInventoryItem | null;
    isOpen: boolean;
    onClose: () => void;
    onTransfer: (itemId: number, toPlayerId: number) => void;
    isLoading?: boolean;
}

export const TransferItemModal = ({
    item,
    isOpen,
    onClose,
    onTransfer,
    isLoading = false,
}: TransferItemModalProps) => {
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(undefined);

    const handleSubmit = () => {
        if (item && selectedPlayerId) {
            onTransfer(item.id, selectedPlayerId);
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedPlayerId(undefined);
        onClose();
    };

    if (!item) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Send className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold">
                                Передать предмет
                            </DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Выберите игрока для передачи
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                        <div className="text-xs font-medium text-slate-500 uppercase mb-1">
                            Передаваемый предмет
                        </div>
                        <div className="font-semibold text-slate-900">{item.name}</div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Получатель
                        </Label>
                        <PlayerSelect value={selectedPlayerId} onSelect={setSelectedPlayerId} />
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-sm text-amber-900">
                            После передачи предмет будет удален из вашего инвентаря!
                        </p>
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
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!selectedPlayerId || isLoading}
                    >
                        {isLoading ? (
                            'Передача...'
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Передать
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
