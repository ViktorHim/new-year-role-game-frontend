import { Page } from '@/shared/ui';
import { ProfileForm } from './profile-form';
import { useEffect } from 'react';

import { PersonalGoals } from './personal-goals';
import { TasksRace } from './tasks-race';

import { useGoals } from '@/entities/goal/store';
import { useTasks } from '@/entities/task/store';

import { InventorySection } from './inventory-section';
import { AbilitiesSection } from './abilities-section';
import { ContractsSection } from './contracts-section';

export const CharacterPage = () => {
    const { getPersonalGoals } = useGoals();
    const { getTasks } = useTasks();

    useEffect(() => {
        getPersonalGoals();
        getTasks();
    }, [getPersonalGoals, getTasks]);

    return (
        <Page>
            <ProfileForm />
            <PersonalGoals />
            <TasksRace />
            <AbilitiesSection />
            <ContractsSection />
            <InventorySection />
        </Page>
    );
};
