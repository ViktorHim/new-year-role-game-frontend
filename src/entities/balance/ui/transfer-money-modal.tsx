import { PlayerSelect } from '@/entities/players';
import { Alert, AlertDescription } from '@/shared/ui/alert';
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
import { Send } from 'lucide-react';
import { useState } from 'react';
import type { ITransferMoneyPayload } from '../model/types';

interface TransferMoneyModalProps {
    isOpen: boolean;
    onClose?: () => void;
    money: number;
    onMoneyTransfer: (payload: Partial<ITransferMoneyPayload>) => Promise<void>;
    error: string;
}

export const TransferMoneyModal = ({
    isOpen,
    onClose,
    money,
    onMoneyTransfer,
    error,
}: TransferMoneyModalProps) => {
    const [selectedPlayerId, setselectedPlayerId] = useState<number | undefined>(undefined);
    const [transferAmount, setTransferAmount] = useState('');

    const handleClose = () => {
        setTransferAmount('');
        setselectedPlayerId(undefined);
        onClose?.();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Перевести деньги</DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Выберите игрока и введите сумму для перевода
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Получатель</label>
                        <PlayerSelect value={selectedPlayerId} onSelect={setselectedPlayerId} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Сумма</label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="0"
                                value={transferAmount}
                                onChange={(e) => {
                                    setTransferAmount(e.target.value);
                                }}
                                max={money || 0}
                                min="1"
                                className="pr-16"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                из {money}
                            </span>
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive" className="py-2">
                            <AlertDescription className="text-sm">{error}</AlertDescription>
                        </Alert>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        type="button"
                        onClick={() =>
                            onMoneyTransfer({
                                amount: Number(transferAmount),
                                to_player_id: selectedPlayerId,
                            })
                        }
                        disabled={!selectedPlayerId || !transferAmount}
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Перевести
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
