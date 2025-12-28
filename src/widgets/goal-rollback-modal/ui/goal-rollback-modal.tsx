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
import { LocalStorageKeys } from '@/shared/config';

interface GoalRollbackModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const GoalRollbackModal = ({ isOpen, onConfirm, onCancel }: GoalRollbackModalProps) => {
    const handleConfirm = () => {
        localStorage.setItem(LocalStorageKeys.GOAL_ROLLBACK_WARNING_SHOWN, 'true');
        onConfirm();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold">
                                Подтверждение отката
                            </DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Это действие повлечет за собой штраф
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-slate-900">
                            Вы уверены, что хотите откатить цель? За откат цели предусмотрен штраф
                            на ОВ.
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 sm:gap-2">
                    <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                        Отмена
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleConfirm}
                        className="flex-1"
                    >
                        Откатить цель
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
