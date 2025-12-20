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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        path: '/',
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
        path: RoutePath.SIGN_IN,
        element: <SignInPage />,
    },
    {
        path: RoutePath.NOT_FOUND,
        element: <NotFoundPage />,
    },
]);
