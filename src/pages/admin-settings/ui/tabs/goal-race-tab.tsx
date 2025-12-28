import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { useEffect, useState } from 'react';
import { Loader2, Trophy } from 'lucide-react';
import { useAppStore } from '@/app/store';

export const GoalRaceTab = () => {
    const { goalRaceTriggers, getGoalRaceTriggers } = useAppStore((state) => state.admin);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getGoalRaceTriggers();
    }, [getGoalRaceTriggers]);

    return (
        <div className="space-y-6">
            <div className="text-sm text-slate-600">
                Всего триггеров гонки:{' '}
                <span className="font-semibold text-slate-900">{goalRaceTriggers.length}</span>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goalRaceTriggers.map((trigger) => (
                        <Card key={trigger.id}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Trophy className="w-4 h-4" />
                                        {trigger.name}
                                    </CardTitle>
                                    <Badge className={trigger.isActive ? 'bg-green-100 text-green-700' : ''}>
                                        {trigger.isActive ? 'Активен' : 'Неактивен'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="text-slate-600">{trigger.description}</div>
                                <div className="pt-2 border-t">
                                    <span className="text-slate-500">Требуется задач:</span>{' '}
                                    <span className="font-medium">{trigger.requiredTasksCount}</span>
                                </div>
                                <div className="text-xs text-slate-500">
                                    Создан: {trigger.createdAt.toLocaleDateString('ru-RU')}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {goalRaceTriggers.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Нет триггеров гонки целей</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
