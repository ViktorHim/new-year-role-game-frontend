import { useAppStore } from '@/app/store';

export const useAbilities = () => useAppStore((state) => state.ability);

export const useAbilityLoading = () => useAppStore((state) => state.ability.isLoading);

export const useRevealedInfo = () => useAppStore((state) => state.ability.revealedInfo);

export const useAbilityActions = () =>
    useAppStore((state) => ({
        getAbilities: state.ability.getAbilities,
        useAbility: state.ability.useAbility,
        clearRevealedInfo: state.ability.clearRevealedInfo,
    }));
