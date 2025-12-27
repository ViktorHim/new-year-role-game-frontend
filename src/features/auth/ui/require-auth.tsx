import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../model/use-auth';
import { RoutePath } from '../../../shared/config';

interface RequireAuthProps {
    redirectTo?: string;
    adminOnly?: boolean;
    playerOnly?: boolean;
}

export const RequireAuth = ({
    redirectTo = RoutePath.SIGN_IN,
    adminOnly = false,
    playerOnly = false,
}: RequireAuthProps) => {
    const { isAuth, isLoading, isAdmin } = useAuth();

    if (isLoading) {
        return <div>Проверка авторизации...</div>;
    }

    if (!isAuth) {
        return <Navigate to={redirectTo} replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to={RoutePath.STORY} replace />;
    }

    if (playerOnly && isAdmin) {
        return <Navigate to={RoutePath.ADMIN} replace />;
    }

    return <Outlet />;
};
