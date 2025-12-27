// entities/faction/model/mappers.ts
import type { IFactionResponse, IFactionMemberResponse, IFactionMember, IFaction } from './types';

export const factionMemberMapper = (member: IFactionMemberResponse): IFactionMember => ({
    id: member.id,
    name: member.character_name,
    role: member.role,
    influence: member.influence,
    avatar: member.avatar,
});

export const factionMapper = (faction: IFactionResponse): IFaction => {
    return {
        id: faction.id,
        name: faction.name,
        description: faction.description,
        factionInfluence: faction.faction_influence,
        totalInfluence: faction.total_influence,
        leaderId: faction.leader_player_id,
        isCurrentPlayerLeader: faction.is_current_player_leader,
        members: faction.members ? faction.members.map(factionMemberMapper) : [],
    };
};

export const factionsListMapper = (factions: IFactionResponse[]): IFaction[] =>
    factions.map(factionMapper);
