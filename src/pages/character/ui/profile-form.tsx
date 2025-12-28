import { useEffect, useState } from 'react';
import { Title } from '@/shared/ui/title';
import { ProfileAvatar } from '@widgets/profile-avatar';
import { useBalance } from '@/entities/balance/store';
import { InfluenceCard, MoneyCard, TransferMoneyModal } from '@/entities/balance';
import type { ITransferMoneyPayload } from '@/entities/balance/model/types';
import { useFaction } from '@/entities/faction/store';
import { useAuth } from '@/features/auth/store';

export const ProfileForm = () => {
    const { player } = useAuth();
    const { avatar, name, role } = player!;

    const { influence, money, getBalance, transferMoney } = useBalance();
    const { getMyFaction, myFactionInfo: faction } = useFaction();

    const factionName = faction?.name ?? 'Нейтрал';

    const [showMoneyTransfer, setShowMoneyTransfer] = useState(false);
    const [transferError, setTransferError] = useState('');

    useEffect(() => {
        getBalance();
        getMyFaction();
    }, []);

    const handleMoneyTransfer = async (payload: Partial<ITransferMoneyPayload>) => {
        if (!payload.to_player_id) {
            setTransferError('Выберите получателя');
            return;
        }
        if (!payload.amount || payload.amount <= 0) {
            setTransferError('Введите корректную сумму');
            return;
        }
        if (payload.amount > (money || 0)) {
            setTransferError(`Недостаточно средств. Доступно: ${money}`);
            return;
        }

        await transferMoney(payload as ITransferMoneyPayload);

        setShowMoneyTransfer(false);
        setTransferError('');
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <div className="flex flex-col items-center gap-3">
                    <ProfileAvatar src={avatar!} fallbackText={name![0]} />
                    <Title tier={1}>{name}</Title>
                    <p className="text-sm text-slate-500">{`${role} • ${factionName}`}</p>
                    <div className="w-full grid grid-cols-2 gap-3 mt-2">
                        <MoneyCard money={money} onClick={() => setShowMoneyTransfer(true)} />
                        <InfluenceCard influence={influence} />
                    </div>
                </div>
            </div>
            <TransferMoneyModal
                isOpen={showMoneyTransfer}
                onClose={() => {
                    setShowMoneyTransfer(false);
                }}
                money={money}
                onMoneyTransfer={handleMoneyTransfer}
                error={transferError}
            />
        </>
    );
};
