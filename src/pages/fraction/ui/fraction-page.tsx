import { Page } from '@/shared/ui';
import { FactionTable } from './faction-table';
import { useFaction } from '@/entities/faction/store';
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/store';

import { Title } from '@/shared/ui/title';
import { FactionGoals } from './faction-goals';
import { useGoals } from '@/entities/goal/store';
import { OtherFactions } from './other-factions';

export const FractionPage = () => {
    const { factionInfo, isLoading, getFaction } = useFaction();
    const { getFactionGoals } = useGoals();

    const { player } = useAuth();

    useEffect(() => {
        getFaction();
        getFactionGoals();
    }, []);

    if (isLoading) return <div>Загрузка...</div>;

    return (
        <Page>
            <Title classname="mb-3">Моя фракция</Title>
            <FactionTable
                totalInfluence={factionInfo?.total_influence}
                factionName={factionInfo?.name}
                members={factionInfo?.members}
                currentPlayerId={factionInfo?.is_current_player_member ? player?.id : undefined}
                leaderPlayerId={factionInfo?.leader_player_id}
            />
            <FactionGoals />
            <OtherFactions />
        </Page>
    );
};
