// entities/inventory/ui/inventory-item-modal.tsx
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Sparkles, Clock } from 'lucide-react';
import type { IInventoryItem, IItemEffect } from '../model/types';
import { BanknotesIcon, StarIcon } from '@heroicons/react/16/solid';

interface InventoryItemModalProps {
    item: IInventoryItem | null;
    isOpen: boolean;
    onClose: () => void;
    onTransfer: (item: IInventoryItem) => void;
}

const getEffectIcon = (effectType: string) => {
    switch (effectType) {
        case 'generate_money':
            return <BanknotesIcon className="w-5 h-5 text-amber-600" />;
        case 'generate_influence':
            return <StarIcon className="w-5 h-5 text-purple-600" />;
        case 'boost_stats':
            return <Sparkles className="w-5 h-5 text-amber-600" />;
        default:
            return <Sparkles className="w-5 h-5 text-amber-600" />;
    }
};

const formatPeriod = (seconds?: number) => {
    if (!seconds) return '';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `каждые ${hours} ч${minutes > 0 ? ` ${minutes} мин` : ''}`;
    }
    if (minutes > 0) {
        return `каждые ${minutes} мин`;
    }
    return `каждые ${seconds} сек`;
};

const EffectCard = ({ effect }: { effect: IItemEffect }) => {
    const effectColor = effect.generatedResource === 'money' ? 'amber' : 'purple';
    return (
        <div className={`bg-${effectColor}-50 border border-${effectColor}-200 rounded-lg p-3`}>
            <div className="flex items-start gap-3">
                <div
                    className={`w-10 h-10 bg-${effectColor}-100 rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                    {getEffectIcon(effect.effectType)}
                </div>

                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 mb-1">{effect.description}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-600">
                        {effect.generatedResource && (
                            <div className="flex items-center gap-1">
                                <span className={`font-semibold text-${effectColor}-600`}>
                                    +{effect.value}
                                </span>
                                <span>
                                    {effect.generatedResource === 'money' ? 'золота' : 'влияния'}
                                </span>
                            </div>
                        )}

                        {effect.periodSeconds && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatPeriod(effect.periodSeconds)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const InventoryItemModal = ({
    item,
    isOpen,
    onClose,
    onTransfer,
}: InventoryItemModalProps) => {
    if (!item) return null;

    const handleTransferClick = () => {
        onTransfer(item);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1">
                            <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <p className="text-sm text-slate-700">{item.description}</p>
                    </div>

                    {item.effects.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-3">
                                Эффекты предмета
                            </h4>
                            <div className="space-y-2">
                                {item.effects.map((effect) => (
                                    <EffectCard key={effect.id} effect={effect} />
                                ))}
                            </div>
                        </div>
                    )}

                    {item.effects.length === 0 && (
                        <div className="text-center py-6">
                            <p className="text-sm text-slate-500">
                                У этого предмета нет особых эффектов
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button onClick={onClose} className="w-full">
                        Закрыть
                    </Button>
                    <Button onClick={handleTransferClick} className="w-full" variant={'outline'}>
                        Передать
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
