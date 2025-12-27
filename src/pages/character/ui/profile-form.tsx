import { useState } from 'react';
import { Title } from '@/shared/ui/title';
import { BanknotesIcon, StarIcon } from '@heroicons/react/16/solid';
import { ProfileAvatar } from '@widgets/profile-avatar';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Send } from 'lucide-react';
import { useTransfer } from '@/entities/transfer/store';
import { PlayerSelect } from '@/entities/players';

interface ProfileFormProps {
    avatar?: string | null;
    faction?: string | null;
    role?: string | null;
    money?: number | null;
    influence?: number | null;
    name?: string | null;
}

export const ProfileForm = ({
    avatar = '',
    faction = 'нет фракции',
    role = 'нет роли',
    name = 'нет данных',
    money = 0,
    influence = 0,
}: ProfileFormProps) => {
    const { transferMoney } = useTransfer();
    const [showMoneyTransfer, setShowMoneyTransfer] = useState(false);
    const [transferAmount, setTransferAmount] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState<number | undefined>(undefined);
    const [transferError, setTransferError] = useState('');

    const handleMoneyTransfer = async () => {
        const amount = parseInt(transferAmount);
        const id = selectedPlayer;

        if (!id) {
            setTransferError('Выберите получателя');
            return;
        }
        if (!amount || amount <= 0) {
            setTransferError('Введите корректную сумму');
            return;
        }
        if (amount > (money || 0)) {
            setTransferError(`Недостаточно средств. Доступно: ${money}`);
            return;
        }

        await transferMoney({ amount, to_player_id: id });

        setShowMoneyTransfer(false);
        setTransferAmount('');
        setSelectedPlayer(undefined);
        setTransferError('');
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <div className="flex flex-col items-center gap-3">
                    <ProfileAvatar src={avatar!} fallbackText={name![0]} />
                    <Title tier={1}>{name}</Title>
                    <p className="text-sm text-slate-500">{`${role} • ${faction}`}</p>

                    <div className="w-full grid grid-cols-2 gap-3 mt-2">
                        <div
                            className="bg-amber-50 rounded-xl p-4 cursor-pointer hover:bg-amber-100 transition-colors"
                            onClick={() => setShowMoneyTransfer(true)}
                        >
                            <div className="text-2xl font-bold text-amber-600 flex items-center gap-2">
                                {money} <BanknotesIcon className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="bg-purple-50 rounded-xl p-4">
                            <div className="text-2xl font-bold text-purple-600 flex items-center gap-2">
                                {influence} <StarIcon className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={showMoneyTransfer} onOpenChange={setShowMoneyTransfer}>
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
                            <PlayerSelect value={selectedPlayer} onSelect={setSelectedPlayer} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Сумма</label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={transferAmount}
                                    onChange={(e) => {
                                        setTransferError('');
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

                        {transferError && (
                            <Alert variant="destructive" className="py-2">
                                <AlertDescription className="text-sm">
                                    {transferError}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setShowMoneyTransfer(false);
                                setTransferError('');
                                setTransferAmount('');
                                setSelectedPlayer(undefined);
                            }}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="button"
                            onClick={handleMoneyTransfer}
                            disabled={!selectedPlayer || !transferAmount}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Перевести
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
