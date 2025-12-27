import { useAuth } from '@/features/auth/store';
import { RouterProvider } from 'react-router';
import { router } from './router/router';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { usePlayers } from '@/entities/players/store';

export const App = () => {
    const { isLoading, getUser, isAuth } = useAuth();
    const { getPlayerList } = usePlayers();

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (isAuth) {
            getPlayerList();
        }
    }, [isAuth, getPlayerList]);

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
