import { Page } from '@/shared/ui';
import { PlayerStory } from './player-story';
import { InfoAboutPlayers } from './info-about-players';
import { STATIC } from '@/shared/config/static';
import { useAuth } from '@/features/auth';
import { Title } from '@/shared/ui/title';

export const StoryPage = () => {
    const { player } = useAuth();
    return (
        <Page>
            <div className="mb-6">
                <Title classname="mb-3">История</Title>
                <p className="text-slate-700 leading-relaxed">{STATIC.STORY}</p>
            </div>
            <PlayerStory story={player!.description} />
            <InfoAboutPlayers info={player!.info_about_players} />
        </Page>
    );
};
