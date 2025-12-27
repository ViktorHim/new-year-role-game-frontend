import { Page } from '@/shared/ui';
import { ProfileForm } from './profile-form';
import { useEffect, useState } from 'react';

import { PersonalGoals } from './personal-goals';

import { useAuth } from '@/features/auth/store';
import { useBalance } from '@/entities/balance/store';
import { useFaction } from '@/entities/faction/store';
import { useGoals } from '@/entities/goal/store';
import { useAbilities } from '@/entities/ability/store';
import {
    AbilitiesParamsModal,
    AbilityList,
    AbilityResultModal,
    type IAbility,
    type IAbilityUseRequest,
} from '@/entities/ability';
import { Title } from '@/shared/ui/title';
import { useRevealedInfo } from '@/entities/ability/store';

export const CharacterPage = () => {
    const { player } = useAuth();
    const { avatar, name, role } = player!;

    const { influence, money, getBalance } = useBalance();
    const { getMyFaction, myFactionInfo } = useFaction();
    const { getPersonalGoals } = useGoals();
    const { abilities, getAbilities, isLoading, useAbility, clearRevealedInfo } = useAbilities();
    const revealedInfo = useRevealedInfo();

    const [selectedAbility, setSelectedAbility] = useState<IAbility | null>(null);

    useEffect(() => {
        getBalance();
        getMyFaction();
        getPersonalGoals();
        getAbilities();
    }, []);

    const handleOpenModal = (ability: IAbility) => {
        setSelectedAbility(ability);
    };

    const handleCloseModal = () => {
        setSelectedAbility(null);
    };

    const handleSubmit = (abilityId: number, payload: IAbilityUseRequest) => {
        useAbility(abilityId, payload);
    };

    const handleCloseResultModal = () => {
        clearRevealedInfo();
    };

    return (
        <Page>
            <ProfileForm
                money={money}
                influence={influence}
                role={role}
                avatar={avatar}
                faction={myFactionInfo?.name}
                name={name}
            />
            <PersonalGoals />
            <Title tier={2} classname="mb-2">
                Способности
            </Title>
            <AbilityList abilities={abilities} onUseAbility={handleOpenModal} isLoading={false} />
            {selectedAbility && (
                <AbilitiesParamsModal
                    abilityType={selectedAbility.abilityType}
                    abilityId={selectedAbility.id}
                    abilityName={selectedAbility.name}
                    isOpen={!!selectedAbility}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            )}
            <AbilityResultModal
                isOpen={!!revealedInfo.infoType}
                onClose={handleCloseResultModal}
                infoType={revealedInfo.infoType}
                factionData={revealedInfo.faction}
                goalData={revealedInfo.goal}
                itemData={revealedInfo.item}
            />
            <Title tier={2} classname="mb-3">
                Инвентарь
            </Title>
        </Page>
    );
};
