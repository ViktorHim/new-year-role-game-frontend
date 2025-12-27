import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import clsx from 'clsx';
import { ArrowRightLeft } from 'lucide-react';

interface FactionChangeCardProps {
    onChangeFaction: () => void;
    classname?: string;
}

export const FactionChangeCard = ({ onChangeFaction, classname }: FactionChangeCardProps) => {
    return (
        <Card className={clsx('border-dashed', classname)}>
            <CardHeader className="text-center pb-0">
                <CardTitle className="text-lg">Смена фракции</CardTitle>
                <CardDescription>
                    У вас есть возможность сменить фракцию. После смены фракции выбор будет
                    окончательным
                </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-0">
                <Button variant="secondary" onClick={onChangeFaction}>
                    Сменить фракцию <ArrowRightLeft />
                </Button>
            </CardContent>
        </Card>
    );
};
