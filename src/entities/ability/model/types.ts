export type AbilityType = 'reveal_info' | 'add_influence' | 'transfer_influence';
export type RevealInfoType = 'faction' | 'goal' | 'item';

export interface IAbilityResponse {
    id: number;
    player_id: number;
    name: string;
    description: string;
    ability_type: AbilityType;
    cooldown_minutes: number;
    start_delay_minutes: number;
    required_influence_points: number | null;
    is_unlocked: boolean;
    last_used_at: string | null;
    next_available_at: string | null;
    can_use_now: boolean;
    block_reason: string | null;
    created_at: string;
}

export interface IAbility {
    id: number;
    playerId: number;
    name: string;
    description: string;
    abilityType: AbilityType;
    cooldownMinutes: number;
    startDelayMinutes: number;
    requiredInfluencePoints: number | null;
    isUnlocked: boolean;
    lastUsedAt: Date | null;
    nextAvailableAt: Date | null;
    canUseNow: boolean;
    blockReason: string | null;
    createdAt: Date;
}

export interface IAbilitiesResponse {
    abilities: IAbilityResponse[];
}

export interface IAbilityUseRequest {
    target_player_id: number;
    info_category?: RevealInfoType;
}

export interface IAbilityUseResponse {
    message: number;
    revealed_info?: {
        info_type: RevealInfoType;
        data: IRevealedFaction | IRevealedGoal | IRevealedItem;
    };
}

export interface IRevealedFaction {
    faction_id: number | null;
    faction_name: string;
}

export interface IRevealedGoal {
    goal_description: string;
    goal_id: number;
    goal_title: string;
}

export interface IRevealedItem {
    item_description: string;
    item_id: number;
    item_name: string;
}
