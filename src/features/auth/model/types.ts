export const UserRole = {
    ADMIN: 0,
    USER: 1,
};

export interface ISignInResponse {
    token: string;
    user: IUser;
}

export interface IPlayer {
    id: number;
    name: string;
    role: string;
    faction_id: number | null;
    can_change_faction: boolean;
    description: string;
    info_about_players: string[];
    avatar: string | null;
}

export interface IUser {
    id: number;
    username: string;
    player_id: number;
    is_admin: boolean;
}
