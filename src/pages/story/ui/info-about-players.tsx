import { InfoCard } from '@/shared/ui/info-card/info-card';

interface InfoAboutPlayersProps {
    info: string[];
}

export const InfoAboutPlayers = ({ info }: InfoAboutPlayersProps) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Информация про других игроков</h2>
            <div className="space-y-3">
                {info.map((info, index) => (
                    <InfoCard key={index} variant="info">
                        {info}
                    </InfoCard>
                ))}
            </div>
        </div>
    );
};
