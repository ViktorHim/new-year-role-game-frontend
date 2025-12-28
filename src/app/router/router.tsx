import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { RequireAuth } from '../../features/auth';
import { RoutePath } from '../../shared/config';
import { Layout } from '../layout';

import { SignInPage } from '../../pages/sign-in';
import { NotFoundPage } from '@/pages/not-found-page';

const StoryPage = lazy(() =>
    import('@/pages/story').then((module) => ({ default: module.StoryPage })),
);
const CharacterPage = lazy(() =>
    import('@/pages/character').then((module) => ({ default: module.CharacterPage })),
);
const FractionPage = lazy(() =>
    import('@/pages/fraction').then((module) => ({ default: module.FractionPage })),
);
const RulesPage = lazy(() =>
    import('@/pages/rules').then((module) => ({ default: module.RulesPage })),
);
const MapPage = lazy(() => import('@/pages/map').then((module) => ({ default: module.MapPage })));
const AdminHome = lazy(() =>
    import('@/pages/admin-home').then((module) => ({ default: module.AdminHome })),
);
const AdminPlayers = lazy(() =>
    import('@/pages/admin-players').then((module) => ({ default: module.AdminPlayers })),
);
const AdminFactions = lazy(() =>
    import('@/pages/admin-factions').then((module) => ({ default: module.AdminFactions })),
);
const AdminGoalsTasks = lazy(() =>
    import('@/pages/admin-goals-tasks').then((module) => ({ default: module.AdminGoalsTasks })),
);
const AdminItemsAbilities = lazy(() =>
    import('@/pages/admin-items-abilities').then((module) => ({ default: module.AdminItemsAbilities })),
);
const AdminSettings = lazy(() =>
    import('@/pages/admin-settings').then((module) => ({ default: module.AdminSettings })),
);

export const router = createBrowserRouter([
    {
        path: RoutePath.SIGN_IN,
        element: <SignInPage />,
    },
    {
        path: RoutePath.NOT_FOUND,
        element: <NotFoundPage />,
    },
    {
        path: RoutePath.ROOT,
        element: <RequireAuth playerOnly={true} />,
        children: [
            {
                element: <Layout isAdmin={false} />,
                children: [
                    {
                        index: true,
                        element: <Navigate to={RoutePath.STORY} />,
                    },
                    {
                        path: RoutePath.STORY,
                        element: <StoryPage />,
                    },
                    {
                        path: RoutePath.CHARACTER,
                        element: <CharacterPage />,
                    },
                    {
                        path: RoutePath.FRACTION,
                        element: <FractionPage />,
                    },
                    {
                        path: RoutePath.RULES,
                        element: <RulesPage />,
                    },
                    {
                        path: RoutePath.MAP,
                        element: <MapPage />,
                    },
                ],
            },
        ],
    },
    {
        path: RoutePath.ADMIN,
        element: <RequireAuth adminOnly={true} />,
        children: [
            {
                element: <Layout isAdmin={true} />,
                children: [
                    {
                        index: true,
                        element: <Navigate to={RoutePath.ADMIN_HOME} />,
                    },
                    {
                        path: RoutePath.ADMIN_HOME,
                        element: <AdminHome />,
                    },
                    {
                        path: RoutePath.ADMIN_PLAYERS,
                        element: <AdminPlayers />,
                    },
                    {
                        path: RoutePath.ADMIN_FACTIONS,
                        element: <AdminFactions />,
                    },
                    {
                        path: RoutePath.ADMIN_GOALS_TASKS,
                        element: <AdminGoalsTasks />,
                    },
                    {
                        path: RoutePath.ADMIN_ITEMS_ABILITIES,
                        element: <AdminItemsAbilities />,
                    },
                    {
                        path: RoutePath.ADMIN_SETTINGS,
                        element: <AdminSettings />,
                    },
                ],
            },
        ],
    },
]);
