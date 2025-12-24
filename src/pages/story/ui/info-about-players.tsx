import { InfoCard } from '@/shared/ui/info-card/info-card';
import { Title } from '@/shared/ui/title';

interface InfoAboutPlayersProps {
    info: string[];
}

export const InfoAboutPlayers = ({ info }: InfoAboutPlayersProps) => {
    return (
        <div className="mb-6">
            <Title tier={2} classname="mb-2">
                Информация про других игроков
            </Title>
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
