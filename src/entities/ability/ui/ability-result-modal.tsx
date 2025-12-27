// entities/ability/ui/ability-result-modal.tsx
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { Copy, Check, Shield, Target, Package } from 'lucide-react';
import { useState } from 'react';
import type {
    IRevealedFaction,
    IRevealedGoal,
    IRevealedItem,
    RevealInfoType,
} from '../model/types';

interface AbilityResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    infoType: RevealInfoType | null;
    factionData?: IRevealedFaction;
    goalData?: IRevealedGoal;
    itemData?: IRevealedItem;
}

export const AbilityResultModal = ({
    isOpen,
    onClose,
    infoType,
    factionData,
    goalData,
    itemData,
}: AbilityResultModalProps) => {
    const [copied, setCopied] = useState(false);

    const getContent = () => {
        if (infoType === 'faction' && factionData) {
            return {
                icon: <Shield className="w-5 h-5 text-slate-600" />,
                title: 'Информация о фракции',
                data: [{ label: 'Фракция', value: factionData.faction_name }],
                copyText: `Фракция: ${factionData.faction_name}`,
            };
        }

        if (infoType === 'goal' && goalData) {
            return {
                icon: <Target className="w-5 h-5 text-slate-600" />,
                title: 'Информация о цели',
                data: [
                    { label: 'Название', value: goalData.goal_title },
                    { label: 'Описание', value: goalData.goal_description },
                ],
                copyText: `Цель: ${goalData.goal_title}\nОписание: ${goalData.goal_description}`,
            };
        }

        if (infoType === 'item' && itemData) {
            return {
                icon: <Package className="w-5 h-5 text-slate-600" />,
                title: 'Информация о предмете',
                data: [
                    { label: 'Название', value: itemData.item_name },
                    { label: 'Описание', value: itemData.item_description },
                ],
                copyText: `Предмет: ${itemData.item_name}\nОписание: ${itemData.item_description}`,
            };
        }

        return null;
    };

    const content = getContent();

    const handleCopy = async () => {
        if (content?.copyText) {
            try {
                await navigator.clipboard.writeText(content.copyText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    if (!content) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                            {content.icon}
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold">{content.title}</DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Полученная информация
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                        {content.data.map((item, index) => (
                            <div key={index}>
                                <div className="text-xs font-medium text-slate-500 uppercase mb-1">
                                    {item.label}
                                </div>
                                <div className="text-sm text-slate-900 font-medium">
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <DialogFooter className="flex items-center gap-2 sm:gap-2">
                    <Button type="button" variant="outline" onClick={handleCopy} className="flex-1">
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 mr-2 text-green-600" />
                                Скопировано
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-2" />
                                Копировать
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
