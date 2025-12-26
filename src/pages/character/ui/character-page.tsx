import { Page } from '@/shared/ui';
import { ProfileForm } from './profile-form';
import { useEffect } from 'react';

import { UniqueAbilities } from './unique-abilities';
import { ItemList } from './item-list';
import { PersonalGoals } from './personal-goals';

import { useAuth } from '@/features/auth/store';
import { useBalance } from '@/entities/balance/store';
import { useFaction } from '@/entities/faction/store';
import { useGoals } from '@/entities/goal/store';
// const mockPlayerData = {
//     abilities: [
//         'Деловые связи: Один раз за игру можете получить информацию о финансовых операциях любого игрока',
//         'Влиятельность: Ваш голос считается за два голоса при принятии коллективных решений',
//         'Защита репутации: Один раз за игру можете отменить любое обвинение, направленное против вас',
//     ],
// };

export const CharacterPage = () => {
    const { player } = useAuth();
    const { avatar, name, role } = player!;

    const { influence, money, getBalance } = useBalance();
    const { getFaction, factionInfo } = useFaction();
    const { getPersonalGoals } = useGoals();

    useEffect(() => {
        getBalance();
        getFaction();
        getPersonalGoals();
    }, []);

    const mockPlayers = [
        { id: 1, name: 'Александра Петрова' },
        { id: 2, name: 'Дмитрий Волков' },
        { id: 3, name: 'Елена Соколова' },
    ];

    const handleTransferMoney = (playerId: string, amount: number) => {
        console.log(`Перевод ${amount} игроку с ID ${playerId}`);
    };

    return (
        <Page>
            <ProfileForm
                money={money}
                influence={influence}
                role={role}
                avatar={avatar}
                faction={factionInfo?.name}
                name={name}
                players={mockPlayers}
                onTransferMoney={handleTransferMoney}
            />
            <PersonalGoals />
            {/* <UniqueAbilities abilities={mockPlayerData.abilities} />
            <PersonalGoals goals={personalGoals} toggleGoal={toggleGoal} />
            <ItemList /> */}
        </Page>
    );
};
