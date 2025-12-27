import { createBrowserRouter, Navigate } from 'react-router';
import { RequireAuth } from '../../features/auth';
import { RoutePath } from '../../shared/config';
import { Layout } from '../layout';

import { SignInPage } from '../../pages/sign-in';
import { StoryPage } from '@/pages/story';
import { CharacterPage } from '@/pages/character';
import { FractionPage } from '@/pages/fraction';
import { RulesPage } from '@/pages/rules';
import { MapPage } from '@/pages/map';
import { NotFoundPage } from '@/pages/not-found-page';
import { AdminHome } from '@/pages/admin-home';
import { AdminPlayers } from '@/pages/admin-players';
import { AdminFactions } from '@/pages/admin-factions';

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
                ],
            },
        ],
    },
]);
