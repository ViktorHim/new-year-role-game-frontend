import { Page } from '@/shared/ui';
import { FactionTable } from './faction-table';
import { useFaction } from '@/entities/faction/store';
import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/store';

import { Title } from '@/shared/ui/title';
import { FactionGoals } from './faction-goals';
import { useGoals } from '@/entities/goal/store';
import { NoFactionCard } from './no-faction-card';
import { SelectFactionModal } from './select-faction-modal';
import { useFactionsToChange } from '@/entities/faction/model/use-faction';
import { FactionChangeCard } from './faction-change-card';

export const FractionPage = () => {
    const {
        myFactionInfo,
        otherFactionsInfo,
        isFactionsListLoading,
        getFactionList,
        changeFaction,
    } = useFaction();
    const factionsToChange = useFactionsToChange();
    const { getFactionGoals, isFactionLoading } = useGoals();
    const { player } = useAuth();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getFactionList();
        getFactionGoals();
    }, []);

    if (isFactionsListLoading || isFactionLoading) return <div>Загрузка...</div>;

    return (
        <Page>
            <Title classname="mb-3">Моя фракция</Title>
            {myFactionInfo ? (
                <>
                    <FactionTable
                        className="mb-2"
                        factionInfluence={myFactionInfo?.factionInfluence}
                        totalInfluence={myFactionInfo?.totalInfluence}
                        factionName={myFactionInfo?.name}
                        members={myFactionInfo?.members}
                        currentPlayerId={player?.id}
                        leaderPlayerId={myFactionInfo?.leaderId}
                    />
                    {!!player?.can_change_faction && (
                        <FactionChangeCard
                            classname="mb-2"
                            onChangeFaction={() => setVisible(true)}
                        />
                    )}
                    <FactionGoals disabled={!myFactionInfo?.isCurrentPlayerLeader} />
                </>
            ) : (
                <NoFactionCard
                    classname="mb-2"
                    canChangeFaction={!!player?.can_change_faction}
                    onSelectFaction={() => setVisible(true)}
                />
            )}
            <Title classname="mb-2" tier={2}>
                Сведения о других фракциях
            </Title>
            {otherFactionsInfo && otherFactionsInfo.length ? (
                otherFactionsInfo.map((factrion) => (
                    <div className="mb-2" key={factrion.id}>
                        <FactionTable
                            showStats={false}
                            factionInfluence={factrion?.factionInfluence}
                            totalInfluence={factrion?.totalInfluence}
                            factionName={factrion?.name}
                            members={factrion?.members}
                            currentPlayerId={null}
                            leaderPlayerId={factrion?.leaderId}
                        />
                    </div>
                ))
            ) : (
                <p>У вас нет информации о других фракциях</p>
            )}
            <SelectFactionModal
                factions={factionsToChange}
                isOpen={visible}
                onClose={() => setVisible(false)}
                isLoading={false}
                onSelect={(faction_id: number) => changeFaction({ faction_id })}
            />
        </Page>
    );
};
