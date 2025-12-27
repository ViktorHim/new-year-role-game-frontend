import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import { Lock, Clock, Star } from 'lucide-react';
import type { IAbility } from '../model/types';

interface AbilityCardProps {
    ability: IAbility;
    onUse: (ability: IAbility) => void;
    isLoading?: boolean;
}

export const AbilityCard = ({ ability, onUse, isLoading = false }: AbilityCardProps) => {
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        if (!ability.nextAvailableAt || ability.canUseNow) {
            setTimeLeft('');
            return;
        }

        const updateTimer = () => {
            const now = new Date();
            const diff = ability.nextAvailableAt!.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft('');
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (hours > 0) {
                setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`);
            } else if (minutes > 0) {
                setTimeLeft(`${minutes}м ${seconds}с`);
            } else {
                setTimeLeft(`${seconds}с`);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [ability.nextAvailableAt, ability.canUseNow]);

    const isLocked = !ability.isUnlocked;
    const isOnCooldown = timeLeft && ability.isUnlocked;

    return (
        <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 transition-all">
            {/* Header */}
            <div className="mb-1">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-slate-900">{ability.name}</h3>
                    {isLocked && <Lock className="w-4 h-4 text-slate-400" />}
                </div>
                <p className="text-sm text-slate-500">{ability.description}</p>
            </div>

            {/* Content */}
            <div className="space-y-2">
                {ability.cooldownMinutes > 0 && (
                    <div className="text-sm text-slate-600">
                        <span>Цикл перезарядки: {ability.cooldownMinutes}м</span>
                    </div>
                )}

                {/* Заблокирована */}
                {isLocked && ability.requiredInfluencePoints !== null && (
                    <div className="h-[40px] bg-slate-100 border border-slate-200 rounded-lg px-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-slate-500" />
                            <span className="text-sm font-medium text-slate-700">
                                Требуется для разблокировки:
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-purple-600">
                                {ability.requiredInfluencePoints}
                            </span>
                            <Star className="w-4 h-4 text-purple-600 fill-purple-600" />
                        </div>
                    </div>
                )}

                {/* На перезарядке */}
                {isOnCooldown && timeLeft && (
                    <div className="h-[40px] bg-amber-50 border border-amber-200 rounded-lg px-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-amber-600" />
                            <span className="text-sm font-medium text-amber-900">
                                Доступно через:
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-amber-600">{timeLeft}</span>
                        </div>
                    </div>
                )}

                {/* Кнопка использования */}
                {!isLocked && !isOnCooldown && (
                    <Button
                        variant="default"
                        onClick={() => onUse(ability)}
                        className="w-full h-[40px]"
                    >
                        {isLoading ? 'Применение...' : 'Использовать'}
                    </Button>
                )}
            </div>
        </div>
    );
};
