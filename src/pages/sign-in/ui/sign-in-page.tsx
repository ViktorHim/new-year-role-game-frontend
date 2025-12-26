import { useAuth } from '@/features/auth/store';
import { Page } from '../../../shared/ui';
import { useState, type MouseEventHandler } from 'react';
import { Navigate } from 'react-router';
import { RoutePath } from '@/shared/config';
import { Input } from '@/shared/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

export const SignInPage = () => {
    const { signIn, isAuth } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    if (isAuth) {
        return <Navigate to={RoutePath.STORY} />;
    }

    const handleSignIn: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        signIn(username, password);
    };

    return (
        <Page centered fullHeight>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Вход</CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4">
                        <Input
                            placeholder="Логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button className="w-full" type="submit" onClick={handleSignIn}>
                            Войти
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Page>
    );
};
