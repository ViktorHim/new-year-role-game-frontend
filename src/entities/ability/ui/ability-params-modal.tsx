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
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Label } from '@/shared/ui/label';
import type { AbilityType, IAbilityUseRequest, RevealInfoType } from '../model/types';
import { User, Info } from 'lucide-react';
import { INFO_CATEGORIES } from '../model/consts';
import { PlayerSelect } from '@/entities/players';

interface AbilitiesParamsModalProps {
    abilityType: AbilityType;
    abilityId: number;
    abilityName: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (abilityId: number, payload: IAbilityUseRequest) => void;
    isLoading?: boolean;
}

export const AbilitiesParamsModal = ({
    abilityType,
    abilityId,
    abilityName,
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
}: AbilitiesParamsModalProps) => {
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(undefined);
    const [selectedInfoCategory, setSelectedInfoCategory] = useState<RevealInfoType>('faction');

    const handleSubmit = () => {
        if (!selectedPlayerId) return;

        const payload: IAbilityUseRequest = {
            target_player_id: selectedPlayerId,
        };

        if (abilityType === 'reveal_info') {
            payload.info_category = selectedInfoCategory;
        }

        onSubmit(abilityId, payload);
        handleClose();
    };

    const handleClose = () => {
        setSelectedPlayerId(undefined);
        setSelectedInfoCategory('faction');
        onClose();
    };

    const isRevealInfo = abilityType === 'reveal_info';

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div>
                            <DialogTitle className="text-xl font-bold">{abilityName}</DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Выберите параметры для применения способности
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Выбор игрока */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Целевой игрок
                        </Label>
                        <PlayerSelect value={selectedPlayerId} onSelect={setSelectedPlayerId} />
                    </div>

                    {/* Категория информации (только для reveal_info) */}
                    {isRevealInfo && (
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Категория информации
                            </Label>
                            <RadioGroup
                                value={selectedInfoCategory}
                                onValueChange={(value) =>
                                    setSelectedInfoCategory(value as RevealInfoType)
                                }
                            >
                                <div className="space-y-2">
                                    {INFO_CATEGORIES.map((category) => (
                                        <div key={category.value}>
                                            <Label
                                                htmlFor={`category-${category.value}`}
                                                className={`
                                                    flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all
                                                    ${
                                                        selectedInfoCategory === category.value
                                                            ? 'border-green-500 bg-green-50'
                                                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                    }
                                                `}
                                            >
                                                <div className="flex-1">
                                                    <div
                                                        className={`
                                                            font-semibold text-sm text-slate-900`}
                                                    >
                                                        {category.label}
                                                    </div>
                                                    <div className="text-xs text-slate-500 mt-0.5">
                                                        {category.description}
                                                    </div>
                                                </div>
                                                <RadioGroupItem
                                                    indicatorClassname="fill-green-500"
                                                    value={category.value}
                                                    id={`category-${category.value}`}
                                                />
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>
                    )}
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
                        {isLoading ? 'Применение...' : 'Применить'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
