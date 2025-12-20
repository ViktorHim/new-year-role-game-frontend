export const UserRole = {
    ADMIN: 0,
    USER: 1,
};

export interface User {
    id: number;
    name: string;
    role: number;
    game_role: number;
}
