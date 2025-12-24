import { InfoCard } from '@/shared/ui/info-card/info-card';

interface UniqueAbilitiesProps {
    abilities: string[];
}

export const UniqueAbilities = ({ abilities }: UniqueAbilitiesProps) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Уникальные способности</h2>
            <div className="space-y-3">
                {abilities.map((ability, index) => (
                    <InfoCard key={index} variant="success" showIcon>
                        {ability}
                    </InfoCard>
                ))}
            </div>
        </div>
    );
};
