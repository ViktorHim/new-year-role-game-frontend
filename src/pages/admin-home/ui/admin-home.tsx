import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { useEffect } from 'react';
import { Play, Pause, StopCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/app/store';

type GameStatus = 'not_started' | 'in_progress' | 'paused' | 'finished';

const GAME_STATUS_LABELS: Record<GameStatus, string> = {
    not_started: 'Игра еще не началась',
    in_progress: 'Идет игра',
    paused: 'Игра приостановлена',
    finished: 'Игра закончена',
};

const GAME_STATUS_COLORS: Record<GameStatus, string> = {
    not_started: 'bg-slate-100 text-slate-700 border-slate-300',
    in_progress: 'bg-green-100 text-green-700 border-green-300',
    paused: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    finished: 'bg-red-100 text-red-700 border-red-300',
};

export const AdminHome = () => {
    const { gameStatus, getGameStatus, startGame, pauseGame, finishGame } = useAppStore(
        (state) => state.admin,
    );

    useEffect(() => {
        getGameStatus();
    }, [getGameStatus]);

    const status: GameStatus = gameStatus?.status || 'not_started';

    const handleStartGame = async () => {
        await startGame();
    };

    const handlePauseGame = async () => {
        await pauseGame();
    };

    const handleFinishGame = async () => {
        await finishGame();
    };

    return (
        <Page>
            <Title tier={1} classname="mb-6">
                Панель управления игрой
            </Title>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Состояние игры</CardTitle>
                        <CardDescription>Управление текущим состоянием игры</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Alert className={`${GAME_STATUS_COLORS[status]} border-2`}>
                            <AlertCircle className="h-5 w-5" />
                            <AlertDescription className="font-semibold text-base">
                                {GAME_STATUS_LABELS[status]}
                            </AlertDescription>
                        </Alert>

                        {gameStatus?.current_round && (
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800 font-medium">
                                    Текущий раунд: {gameStatus.current_round}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={handleStartGame}
                                disabled={status === 'in_progress'}
                                className="flex items-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                Начать игру
                            </Button>
                            <Button
                                onClick={handlePauseGame}
                                disabled={status !== 'in_progress'}
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <Pause className="w-4 h-4" />
                                Приостановить
                            </Button>
                            <Button
                                onClick={handleFinishGame}
                                disabled={status === 'finished'}
                                variant="destructive"
                                className="flex items-center gap-2"
                            >
                                <StopCircle className="w-4 h-4" />
                                Завершить игру
                            </Button>
                        </div>

                        {status === 'in_progress' && (
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    Игра активна. Игроки могут выполнять действия.
                                </p>
                                {gameStatus?.started_at && (
                                    <p className="text-xs text-blue-600 mt-1">
                                        Начата: {new Date(gameStatus.started_at).toLocaleString('ru-RU')}
                                    </p>
                                )}
                            </div>
                        )}

                        {status === 'paused' && (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    Игра приостановлена. Действия игроков временно заблокированы.
                                </p>
                            </div>
                        )}

                        {status === 'finished' && (
                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                <p className="text-sm text-amber-800">
                                    Игра завершена. Дальнейшие действия игроков невозможны.
                                </p>
                                {gameStatus?.finished_at && (
                                    <p className="text-xs text-amber-600 mt-1">
                                        Завершена: {new Date(gameStatus.finished_at).toLocaleString('ru-RU')}
                                    </p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Page>
    );
};
