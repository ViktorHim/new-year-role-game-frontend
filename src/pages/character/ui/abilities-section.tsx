import {
    type IAbility,
    type IAbilityUseRequest,
    AbilityList,
    AbilitiesParamsModal,
    AbilityResultModal,
} from '@/entities/ability';
import { useAbilities, useRevealedInfo } from '@/entities/ability/store';
import { Title } from '@/shared/ui/title';
import { useState, useEffect } from 'react';

export const AbilitiesSection = () => {
    const { abilities, getAbilities, isLoading, useAbility, clearRevealedInfo } = useAbilities();
    const revealedInfo = useRevealedInfo();

    const [selectedAbility, setSelectedAbility] = useState<IAbility | null>(null);

    useEffect(() => {
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
        <>
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
        </>
    );
};
