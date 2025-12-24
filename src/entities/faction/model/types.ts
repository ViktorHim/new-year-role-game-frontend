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
    members: IFactionMember[];
}

export interface IFactionMember {
    id: number;
    character_name: string;
    role: string;
    influence: number;
    avatar: string | null;
}
