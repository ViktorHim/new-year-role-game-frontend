import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../model/store';
import { RoutePath } from '../../../shared/config';

interface RequireAuthProps {
    redirectTo?: string;
}

export const RequireAuth = ({ redirectTo = RoutePath.SIGN_IN }: RequireAuthProps) => {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to={redirectTo} />;
    }

    return <Outlet />;
};
