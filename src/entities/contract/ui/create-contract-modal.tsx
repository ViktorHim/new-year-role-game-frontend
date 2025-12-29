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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Label } from '@/shared/ui/label';
import { FileText, User } from 'lucide-react';
import type { ContractType, ICreateContractRequest } from '../model/types';
import { PlayerSelect } from '@/entities/players';
import { CONTRACT_TYPES } from '../model/consts';
import { useAuth } from '@/features/auth/store';

interface CreateContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (payload: ICreateContractRequest) => void;
    isLoading?: boolean;
    activeContractCounts: { type1: number; type2: number };
}

export const CreateContractModal = ({
    isOpen,
    onClose,
    onCreate,
    isLoading = false,
    activeContractCounts,
}: CreateContractModalProps) => {
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(undefined);
    const [selectedType, setSelectedType] = useState<ContractType>('type1');
    const { player } = useAuth();

    if (player?.id !== 21 && player?.id !== 17) return null;

    const type: ContractType = player?.id === 21 ? 'type1' : 'type2';

    const isLimitReached = activeContractCounts[type] >= 3;

    const handleSubmit = () => {
        if (selectedPlayerId && !isLimitReached) {
            const payload: ICreateContractRequest = {
                contract_type: type,
                customer_player_id: selectedPlayerId,
                duration_seconds: 60,
            };

            onCreate(payload);
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedPlayerId(undefined);
        setSelectedType('type1');
        onClose();
    };

    const handleTypeChange = (newType: ContractType) => {
        setSelectedType(newType);
        setSelectedPlayerId(undefined);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md max-h-[50vh] flex flex-col">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl font-bold">Создать договор</DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Заключите новый договор с игроком
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4 overflow-y-auto flex-1 px-1">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {type === 'type1' ? 'Заказчик' : 'Игрок, о котором нужно узнать факт'}
                        </Label>
                        <PlayerSelect value={selectedPlayerId} onSelect={setSelectedPlayerId} />
                    </div>

                    <div className="space-y-2">
                        <div className="text-xs text-slate-500 mt-2">
                            <div className="space-y-4 text-xs text-slate-700">
                                <p className="font-medium text-slate-900">
                                    {CONTRACT_TYPES.find((t) => t.value === type)?.description}
                                    При подписании договора действуют следующие условия:
                                </p>

                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">
                                            1. Договор с фракцией мафии
                                        </h4>

                                        <p className="mb-2">
                                            При заключении договора вы также принимаете условия{' '}
                                            <span className="font-medium">Омерты</span>:
                                        </p>

                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Вы принимаете обет молчания.</li>
                                            <li>
                                                Запрещено разглашать факт сотрудничества и личность
                                                стороны, заключившей с вами договор.
                                            </li>
                                            <li>
                                                Запрещено сотрудничество с представителями Дворца.
                                            </li>
                                        </ul>

                                        <p className="mt-2 text-rose-600 font-medium">
                                            Несоблюдение условий договора карается.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">
                                            2. Договор с фракцией Дворца
                                        </h4>

                                        <p className="mb-2">
                                            При заключении договора ваш порт полностью подчиняется
                                            указаниям Дворца.
                                        </p>

                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Провоз незаконной продукции строго запрещён.</li>
                                        </ul>

                                        <p className="mt-2 text-rose-600 font-medium">
                                            Несоблюдение условий договора карается.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        disabled={!selectedPlayerId || isLoading || isLimitReached}
                        title={
                            isLimitReached
                                ? `Достигнут лимит активных договоров типа "${CONTRACT_TYPES.find((t) => t.value === type)?.label}"`
                                : ''
                        }
                    >
                        {isLoading ? 'Создание...' : 'Заключить договор'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
