import { useAuth } from '@/features/auth/store';
import { RouterProvider } from 'react-router';
import { router } from './router/router';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { usePlayers } from '@/entities/players/store';

export const App = () => {
    const { isLoading, getUser, isAuth, isAdmin } = useAuth();
    const { getPlayerList } = usePlayers();

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        if (isAuth && !isAdmin) {
            getPlayerList();
        }
    }, [isAuth, getPlayerList, isAdmin]);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <RouterProvider router={router} />;
            <Toaster position="top-right" duration={1000} />
        </>
    );
};
