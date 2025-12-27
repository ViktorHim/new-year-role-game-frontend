export interface IFactionResponse {
    id: number;
    name: string;
    description: string;
    faction_influence: number;
    total_influence: number;
    is_composition_visible_to_all: boolean;
    leader_player_id: number;
    is_current_player_leader: boolean;
    is_current_player_member: boolean;
    members?: IFactionMemberResponse[];
}

export interface IFactionMemberResponse {
    id: number;
    character_name: string;
    role: string;
    influence: number;
    avatar: string | null;
}

export interface IFactionMember extends Omit<IFactionMemberResponse, 'character_name'> {
    name: string;
}

export interface IFaction {
    id: number;
    name: string;
    description: string;
    factionInfluence: number;
    totalInfluence: number;
    leaderId: number;
    isCurrentPlayerLeader?: boolean;
    members: IFactionMember[];
}

export interface IFactionOption {
    id: number;
    name: string;
}

export interface IChangeFactionPayload {
    faction_id: number;
}
