import { Page } from '@/shared/ui';
import { PlayerStory } from './player-story';
import { InfoAboutPlayers } from './info-about-players';
import { STATIC } from '@/shared/config/static';
import { useAuth } from '@/features/auth/store';
import { Title } from '@/shared/ui/title';
import { InfoCard } from '@/shared/ui/info-card/info-card';

export const StoryPage = () => {
    const { player } = useAuth();
    return (
        <Page>
            <div className="mb-3">
                <Title classname="mb-3">История</Title>
                <InfoCard variant="info">{STATIC.STORY}</InfoCard>
            </div>
            <PlayerStory story={player!.description} />
            <InfoAboutPlayers info={player!.info_about_players} />
        </Page>
    );
};
