import { RoutePath } from '@/shared/config';
import { Page } from '@/shared/ui';
import { Button } from '@/shared/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Page centered>
            <Card className="w-full max-w-md text-center p-6">
                <CardHeader>
                    <CardTitle className="text-6xl font-bold text-gray-900">404</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-lg text-gray-700">Страница не найдена.</p>

                    <Button className="w-full" onClick={() => navigate(RoutePath.STORY)}>
                        На главную
                    </Button>
                </CardContent>
            </Card>
        </Page>
    );
};
