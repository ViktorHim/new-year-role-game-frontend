import { AbilityCard } from './ability-card';
import type { IAbility } from '../model/types';
import { Sparkles } from 'lucide-react';

interface AbilityListProps {
    abilities: IAbility[];
    onUseAbility: (ability: IAbility) => void;
    isLoading?: boolean;
}

export const AbilityList = ({ abilities, onUseAbility, isLoading = false }: AbilityListProps) => {
    if (abilities.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500">У вас пока нет способностей</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {abilities.map((ability) => (
                <AbilityCard
                    key={ability.id}
                    ability={ability}
                    onUse={onUseAbility}
                    isLoading={isLoading}
                />
            ))}
        </div>
    );
};
