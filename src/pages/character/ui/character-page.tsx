import { Page } from '@/shared/ui';
import { ProfileForm } from './profile-form';
import { useEffect } from 'react';

import { UniqueAbilities } from './unique-abilities';
import { PersonalGoals } from './personal-goals';
import { ItemList } from './item-list';

import { useAuth } from '@/features/auth';
import { useBalance } from '@/entities/balance';
import { useFaction } from '@/entities/faction';
// const mockPlayerData = {
//     abilities: [
//         'Деловые связи: Один раз за игру можете получить информацию о финансовых операциях любого игрока',
//         'Влиятельность: Ваш голос считается за два голоса при принятии коллективных решений',
//         'Защита репутации: Один раз за игру можете отменить любое обвинение, направленное против вас',
//     ],
//     personalGoals: [
//         {
//             id: 1,
//             description: 'Заключить выгодную сделку с представителем мафии',
//             completed: false,
//         },
//         { id: 2, description: 'Узнать настоящую личность главы полиции', completed: false },
//         { id: 3, description: 'Накопить 10000 денег', completed: false },
//         { id: 4, description: 'Получить 500 очков влияния', completed: true },
//     ],
// };

export const CharacterPage = () => {
    const { player } = useAuth();
    const { avatar, name, role } = player!;

    const { influence, money, getBalance } = useBalance();
    const { getFaction, factionInfo } = useFaction();

    useEffect(() => {
        getBalance();
        getFaction();
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
            {/* <UniqueAbilities abilities={mockPlayerData.abilities} />
            <PersonalGoals goals={personalGoals} toggleGoal={toggleGoal} />
            <ItemList /> */}
        </Page>
    );
};
