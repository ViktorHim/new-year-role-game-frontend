// entities/ability/model/mappers.ts
import type { IAbilityResponse, IAbility } from './types';

export const abilityMapper = (ability: IAbilityResponse): IAbility => ({
    id: ability.id,
    playerId: ability.player_id,
    name: ability.name,
    description: ability.description,
    abilityType: ability.ability_type,
    cooldownMinutes: ability.cooldown_minutes,
    startDelayMinutes: ability.start_delay_minutes,
    requiredInfluencePoints: ability.required_influence_points,
    isUnlocked: ability.is_unlocked,
    lastUsedAt: ability.last_used_at ? new Date(ability.last_used_at) : null,
    nextAvailableAt: ability.next_available_at ? new Date(ability.next_available_at) : null,
    canUseNow: ability.can_use_now,
    blockReason: ability.block_reason,
    createdAt: new Date(ability.created_at),
});

export const abilitiesListMapper = (abilities: IAbilityResponse[]): IAbility[] =>
    abilities.map(abilityMapper);
