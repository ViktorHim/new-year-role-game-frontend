import { Page } from '@/shared/ui';
import { ProfileForm } from './profile-form';
import { useEffect } from 'react';

import { PersonalGoals } from './personal-goals';

import { useGoals } from '@/entities/goal/store';

import { InventorySection } from './inventory-section';
import { AbilitiesSection } from './abilities-section';
import { ContractsSection } from './contracts-section';

export const CharacterPage = () => {
    const { getPersonalGoals } = useGoals();

    useEffect(() => {
        getPersonalGoals();
    }, []);

    return (
        <Page>
            <ProfileForm />
            <PersonalGoals />
            <AbilitiesSection />
            <ContractsSection />
            <InventorySection />
        </Page>
    );
};
