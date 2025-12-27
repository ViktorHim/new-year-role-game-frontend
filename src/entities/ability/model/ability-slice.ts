import type {
    IAbility,
    IAbilityUseRequest,
    IRevealedFaction,
    IRevealedGoal,
    IRevealedItem,
    RevealInfoType,
} from './types';
import { AbilityService } from '../api/ability-service';
import { abilitiesListMapper } from './mappers';
import type { ImmerSlice } from '@/app/store';
import { toast } from 'sonner';

export interface AbilityStore {
    abilities: IAbility[];
    isLoading: boolean;
    revealedInfo: {
        infoType: RevealInfoType | null;
        faction?: IRevealedFaction;
        goal?: IRevealedGoal;
        item?: IRevealedItem;
    };

    getAbilities: () => Promise<void>;
    useAbility: (abilityId: number, payload: IAbilityUseRequest) => Promise<void>;
    clearRevealedInfo: () => void;
}

export const createAbilitySlice: ImmerSlice<AbilityStore> = (set, get) => ({
    abilities: [],
    isLoading: false,
    revealedInfo: { infoType: null },

    getAbilities: async () => {
        set((state) => {
            state.ability.isLoading = true;
        });

        try {
            const response = await AbilityService.getAbilities();
            const mappedAbilities = abilitiesListMapper(response.data.abilities);

            set((state) => {
                state.ability.abilities = mappedAbilities;
                state.ability.isLoading = false;
            });
        } catch {
            set((state) => {
                state.ability.abilities = [];
                state.ability.isLoading = false;
            });
            toast.error('Ошибка загрузки способностей');
        }
    },

    useAbility: async (abilityId, payload) => {
        try {
            const response = await AbilityService.useAbility(abilityId, payload);
            set((state) => {
                state.ability.revealedInfo = {
                    infoType: null,
                };
            });

            if (response.data?.revealed_info?.info_type) {
                const { info_type, data } = response.data.revealed_info;

                set((state) => {
                    state.ability.revealedInfo = {
                        infoType: info_type,
                        [info_type]: data,
                    };
                });
            }

            toast.success('Способность успешно применена!');

            await get().ability.getAbilities();
        } catch {
            toast.error('Ошибка применения способности');
        }
    },
    clearRevealedInfo: () => {
        set((state) => {
            state.ability.revealedInfo = {
                infoType: null,
            };
        });
    },
});
