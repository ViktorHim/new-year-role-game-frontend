import { useAppStore } from '@/app/store';
import { useShallow } from 'zustand/shallow';

export const useFaction = () => useAppStore((state) => state.faction);
export const useMyFaction = () => useAppStore((state) => state.faction.myFactionInfo);
export const useOtherFactions = () => useAppStore((state) => state.faction.otherFactionsInfo);
export const useFactionsToChange = () =>
    useAppStore(
        useShallow((state) =>
            state.faction.factionOptionList.filter(
                (faction) => faction.id !== state.faction.myFactionInfo?.id,
            ),
        ),
    );
