import { InfoCard } from '@/shared/ui/info-card/info-card';
import { Title } from '@/shared/ui/title';

interface PlayerStoryProps {
    story: string;
}

export const PlayerStory = ({ story }: PlayerStoryProps) => {
    return (
        <div className="mb-3">
            <Title classname="mb-2" tier={2}>
                История персонажа
            </Title>
            <InfoCard variant="info">{story}</InfoCard>
        </div>
    );
};
