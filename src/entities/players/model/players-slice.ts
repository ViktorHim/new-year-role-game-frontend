import type { ImmerSlice } from '@/app/store';
import type { IPlayerInfo } from './types';
import { PlayersService } from '../api/players-service';

export interface PlayersStore {
    isPlayersLoading: boolean;
    playerList: IPlayerInfo[];
    getPlayerList: () => Promise<void>;
}

export const createPlayersSlice: ImmerSlice<PlayersStore> = (set) => ({
    isPlayersLoading: false,
    playerList: [],
    getPlayerList: async () => {
        set((state) => {
            state.players.isPlayersLoading = true;
        });

        try {
            const response = await PlayersService.getPlayerList();
            set((state) => {
                state.players.playerList = response.data.players ?? [];
                state.players.isPlayersLoading = false;
            });
        } catch {
            set((state) => {
                state.players.isPlayersLoading = false;
            });
        }
    },
});
