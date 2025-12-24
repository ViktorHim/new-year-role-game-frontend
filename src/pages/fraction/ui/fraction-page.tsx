import { Page } from '@/shared/ui';
import { FactionTable } from './faction-table';
import { useFaction } from '@/entities/faction';
import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth';
import { Goals } from '@/widgets/goals';
import type { IGoal } from '@/entities/goal';
import { Title } from '@/shared/ui/title';

const mockgoals: IGoal[] = [
    { id: 0, completed: true, description: 'Собрать 300 очков влияния' },
    { id: 1, completed: false, description: 'Казнить мафию' },
    { id: 2, completed: false, description: 'Принять в свои ряды 2ух игроков' },
];

export const FractionPage = () => {
    const { factionInfo, isLoading, getFaction } = useFaction();
    const { player } = useAuth();

    useEffect(() => {
        getFaction();
    }, []);

    const [goals, setGoals] = useState(mockgoals);

    const toggleGoal = (goalId: string | number) => {
        setGoals((prev) =>
            prev.map((goal) =>
                goal.id === goalId ? { ...goal, completed: !goal.completed } : goal,
            ),
        );
    };

    if (isLoading) return <div>Загрузка...</div>;

    return (
        <Page>
            <div className="mb-6">
                <Title classname="mb-3">Моя фракция</Title>
                <FactionTable
                    totalInfluence={factionInfo!.total_influence}
                    factionName={factionInfo!.name}
                    members={factionInfo!.members}
                    currentPlayerId={factionInfo!.is_current_player_member ? player?.id : undefined}
                    leaderPlayerId={factionInfo!.leader_player_id}
                />
            </div>
            <div className="mb-6">
                <Title tier={2} classname="mb-2">
                    Командные цели
                </Title>
                <Goals toggleGoal={toggleGoal} goals={goals} variant="faction" />
            </div>
        </Page>
    );
};
