import { Button } from '@/shared/ui/button';
import { Users, Eye } from 'lucide-react';
import type { IMyContract, IReceivedContract, ContractStatus } from '../model/types';
import { BanknotesIcon } from '@heroicons/react/16/solid';
import { CONTRACT_TYPE_LABELS } from '../model/consts';

interface ContractCardProps {
    contract: IMyContract | IReceivedContract;
    onSign?: (contract: IReceivedContract) => void;
    onClaimReward?: (contractId: number) => void;
}

const STATUS_CONFIG: Record<ContractStatus, { label: string; className: string }> = {
    pending: {
        label: 'Ожидает подписи',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    signed: {
        label: 'Подписан',
        className: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    completed: {
        label: 'Завершен',
        className: 'bg-green-50 text-green-700 border-green-200',
    },
    terminated: {
        label: 'Отменен',
        className: 'bg-slate-50 text-rose-700 border-rose-200',
    },
};

const isMyContract = (contract: IMyContract | IReceivedContract): contract is IReceivedContract => {
    return 'isCustomer' in contract;
};

export const ContractCard = ({ contract, onSign, onClaimReward }: ContractCardProps) => {
    const statusConfig = STATUS_CONFIG[contract.status];
    const isCustomer = isMyContract(contract);

    const canClaimReward =
        contract.status === 'completed' && !isCustomer && contract.contractType === 'type2';

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-semibold text-slate-900">
                        {CONTRACT_TYPE_LABELS[contract.contractType]}
                    </h3>
                </div>

                <div
                    className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1 ${statusConfig.className}`}
                >
                    {statusConfig.label}
                </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-slate-900" />
                    </div>
                    <div>
                        {isCustomer ? (
                            <>
                                <div className="text-xs text-slate-500">Исполнитель</div>
                                <div className="font-medium text-slate-900">
                                    {contract.executorPlayerName}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-xs text-slate-500">Заказчик</div>
                                <div className="font-medium text-slate-900">
                                    {contract.customerPlayerName}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-2 mb-3">
                <div className="flex items-center gap-1 text-sm">
                    <span className="text-slate-600">
                        {contract.status === 'completed' ? 'Вы получили:' : 'Вы получите:'}
                    </span>
                    <div className="flex items-center gap-1 font-semibold text-amber-600">
                        {contract.moneyReward}
                        <BanknotesIcon className="w-4 h-4" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                {isCustomer && contract.status === 'pending' && contract.canSign && onSign && (
                    <Button onClick={() => onSign(contract)} className="w-full" size="sm">
                        Подписать договор
                    </Button>
                )}

                {canClaimReward && onClaimReward && (
                    <Button
                        onClick={() => onClaimReward(contract.id)}
                        variant="outline"
                        className="w-full"
                        size="sm"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Забрать награду
                    </Button>
                )}
            </div>
        </div>
    );
};
