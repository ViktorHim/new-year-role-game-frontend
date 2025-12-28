import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { AlertTriangle } from 'lucide-react';
import type { IReceivedContract } from '../model/types';
import { CONTRACT_TYPES } from '../model/consts';

interface SignContractModalProps {
    contract: IReceivedContract | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (contractId: number) => void;
    isLoading?: boolean;
}

export const SignContractModal = ({
    contract,
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
}: SignContractModalProps) => {
    if (!contract) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md max-h-[50vh] flex flex-col">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                        </div>
                        <DialogTitle className="text-xl font-bold">
                            Подтверждение подписания
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-slate-600 pt-2">
                        Вы уверены, что хотите подписать договор с{' '}
                        <span className="font-semibold text-slate-900">
                            {contract.executorPlayerName}
                        </span>
                        ?
                    </DialogDescription>
                </DialogHeader>

                <div className="text-xs text-slate-500 mt-2 overflow-y-auto flex-1 px-1">
                    <div className="space-y-4 text-xs text-slate-700">
                        <p className="font-medium text-slate-900">
                            {
                                CONTRACT_TYPES.find((t) => t.value === contract.contractType)
                                    ?.description
                            }
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
                                        Запрещено разглашать факт сотрудничества и личность стороны,
                                        заключившей с вами договор.
                                    </li>
                                    <li>Запрещено сотрудничество с представителями Дворца.</li>
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
                                    При заключении договора ваш порт полностью подчиняется указаниям
                                    Дворца.
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

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                        Отмена
                    </Button>
                    <Button
                        type="button"
                        onClick={() => onConfirm(contract.id)}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Подписание...' : 'Подписать'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
