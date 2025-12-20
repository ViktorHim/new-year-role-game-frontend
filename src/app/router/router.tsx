import { createBrowserRouter, Navigate } from "react-router";
import { RequireAuth } from "../../features/auth";
import { RoutePath } from "../../shared/config";
import { SignInPage } from "../../pages/sign-in";
import { Layout } from "../layout";
import { Page } from "../../shared/ui";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth/>,
        children: [
            {
                element: <Layout/>,
                children: [
                    {
                        path: '/',
                        element: <Navigate to={RoutePath.STORY}/>
                    },
                    {
                        path: RoutePath.STORY,
                        element: <Page>История</Page>
                    },
                                        {
                        path: RoutePath.CHARACTER,
                        element: <Page>Персонаж</Page>
                    },
                                        {
                        path: RoutePath.FRACTION,
                        element: <Page>Фракция</Page>
                    },
                                        {
                        path: RoutePath.RULES,
                        element: <Page>Правила</Page>
                    },
                                        {
                        path: RoutePath.MAP,
                        element: <Page>Карта</Page>
                    }
                ]
            }
        ]
    },
    {
        path: RoutePath.SIGN_IN,
        element: <SignInPage/>
    }
])