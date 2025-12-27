import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import clsx from 'clsx';
import { Users } from 'lucide-react';

interface NoFactionCardProps {
    canChangeFaction: boolean;
    onSelectFaction?: () => void;
    classname?: string;
}

export const NoFactionCard = ({
    canChangeFaction,
    onSelectFaction,
    classname,
}: NoFactionCardProps) => {
    return (
        <Card className={clsx('border-dashed', classname)}>
            <CardHeader className="text-center pb-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-slate-400" />
                </div>
                <CardTitle className="text-lg">Нет фракции</CardTitle>
                <CardDescription>Вы не состоите ни в одной из фракций</CardDescription>
            </CardHeader>
            {canChangeFaction && (
                <CardContent className="text-center pt-0">
                    <Button variant="secondary" onClick={onSelectFaction}>
                        Выбрать фракцию
                    </Button>
                </CardContent>
            )}
        </Card>
    );
};
