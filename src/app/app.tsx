import { useAuth } from '@/features/auth/store';
import { RouterProvider } from 'react-router';
import { router } from './router/router';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

export const App = () => {
    const { isLoading, getUser } = useAuth();

    useEffect(() => {
        getUser();
    }, []);

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
