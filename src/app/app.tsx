import { useAuth } from '@/features/auth';
import { RouterProvider } from 'react-router';
import { router } from './router/router';
import { useEffect } from 'react';

export const App = () => {
    const { isLoading, getUser } = useAuth();

    useEffect(() => {
        getUser();
    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return <RouterProvider router={router} />;
};
