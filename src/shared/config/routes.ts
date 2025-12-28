export const RoutePath = {
    // public routes
    SIGN_IN: '/sign-in',
    NOT_FOUND: '*',
    // player routes
    ROOT: '/',
    STORY: '/story',
    CHARACTER: '/character',
    FRACTION: '/fraction',
    RULES: '/rules',
    MAP: '/map',
    // admin routes
    ADMIN: '/admin',
    ADMIN_HOME: '/admin/home',
    ADMIN_PLAYERS: '/admin/players',
    ADMIN_GOALS_TASKS: '/admin/goals-tasks',
    ADMIN_ITEMS_ABILITIES: '/admin/items-abilities',
    ADMIN_SETTINGS: '/admin/settings',
} as const;
