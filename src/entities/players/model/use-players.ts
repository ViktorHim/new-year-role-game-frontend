import { useAppStore } from '@/app/store';
import { useShallow } from 'zustand/shallow';

export const usePlayers = () => useAppStore((state) => state.players);
export const usePlayersList = () =>
    useAppStore(
        useShallow((state) =>
            state.players.playerList.filter((player) => player.id !== state.auth.player?.id),
        ),
    );
