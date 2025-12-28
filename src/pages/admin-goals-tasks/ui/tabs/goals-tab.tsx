import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Loader2, Target, CheckCircle2, Users, User, Shield } from 'lucide-react';
import { useAppStore } from '@/app/store';
import { GoalModal } from '../modals/goal-modal';
import type { IAdminGoal } from '@/entities/admin';

export const GoalsTab = () => {
    const {
        goals,
        players,
        factions,
        isLoadingGoals,
        getGoals,
        getPlayers,
        getFactions,
        createGoal,
        updateGoal,
        deleteGoal,
        completeGoal,
    } = useAppStore((state) => state.admin);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState<IAdminGoal | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState<number | null>(null);

    useEffect(() => {
        getGoals();
        getPlayers();
        getFactions();
    }, [getGoals, getPlayers, getFactions]);

    const handleCreateGoal = async (data: {
        title: string;
        description: string;
        goal_type: 'personal' | 'general' | 'faction';
        faction_id?: number;
        player_id?: number;
        influence_points_reward: number;
    }) => {
        await createGoal(data);
        setIsCreateModalOpen(false);
    };

    const handleUpdateGoal = async (data: {
        title?: string;
        description?: string;
        influence_points_reward?: number;
    }) => {
        if (editingGoal) {
            await updateGoal(editingGoal.id, data);
            setEditingGoal(null);
        }
    };

    const handleDeleteGoal = (id: number) => {
        setGoalToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (goalToDelete !== null) {
            await deleteGoal(goalToDelete);
        }
        setDeleteConfirmOpen(false);
        setGoalToDelete(null);
    };

    const handleCompleteGoal = async (goalId: number) => {
        const goal = goals.find((g) => g.id === goalId);
        if (!goal) return;

        const playerName = window.prompt(
            `Кто выполнил цель "${goal.title}"?\nВведите ID игрока:`
        );

        if (playerName) {
            const playerId = parseInt(playerName);
            if (!isNaN(playerId)) {
                await completeGoal(goalId, { player_id: playerId });
            }
        }
    };

    const getGoalTypeLabel = (type: string) => {
        switch (type) {
            case 'personal':
                return 'Личная';
            case 'faction':
                return 'Фракционная';
            case 'general':
                return 'Общая';
            default:
                return type;
        }
    };

    const getGoalTypeColor = (type: string) => {
        switch (type) {
            case 'personal':
                return 'bg-purple-100 text-purple-700';
            case 'faction':
                return 'bg-blue-100 text-blue-700';
            case 'general':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const getGoalTypeIcon = (type: string) => {
        switch (type) {
            case 'personal':
                return <User className="w-4 h-4" />;
            case 'faction':
                return <Shield className="w-4 h-4" />;
            case 'general':
                return <Users className="w-4 h-4" />;
            default:
                return <Target className="w-4 h-4" />;
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-slate-600">
                    Всего целей: <span className="font-semibold text-slate-900">{goals.length}</span>
                    {' • '}
                    Выполнено: <span className="font-semibold text-green-600">
                        {goals.filter((g) => g.isCompleted).length}
                    </span>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Создать цель
                </Button>
            </div>

            {isLoadingGoals ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goals.map((goal) => (
                        <Card
                            key={goal.id}
                            className={`hover:shadow-md transition-shadow ${goal.isCompleted ? 'opacity-60' : ''}`}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <Badge className={`${getGoalTypeColor(goal.goalType)} flex items-center gap-1`}>
                                        {getGoalTypeIcon(goal.goalType)}
                                        {getGoalTypeLabel(goal.goalType)}
                                    </Badge>
                                    {goal.isCompleted && (
                                        <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Выполнена
                                        </Badge>
                                    )}
                                </div>
                                <CardTitle className="text-base">{goal.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-slate-600 line-clamp-2">{goal.description}</p>

                                <div className="flex flex-wrap gap-2 text-xs">
                                    {goal.playerName && (
                                        <Badge variant="outline" className="text-xs">
                                            <User className="w-3 h-3 mr-1" />
                                            {goal.playerName}
                                        </Badge>
                                    )}
                                    {goal.factionName && (
                                        <Badge variant="outline" className="text-xs">
                                            <Shield className="w-3 h-3 mr-1" />
                                            {goal.factionName}
                                        </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                        <Target className="w-3 h-3 mr-1" />
                                        +{goal.influencePointsReward} ОВ
                                    </Badge>
                                </div>

                                {goal.isCompleted && goal.completedByPlayerName && (
                                    <div className="text-xs text-green-600 pt-2 border-t">
                                        Выполнил: {goal.completedByPlayerName}
                                    </div>
                                )}

                                <div className="flex gap-1 pt-2">
                                    {!goal.isCompleted && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 h-7 text-xs text-green-600 hover:bg-green-50"
                                            onClick={() => handleCompleteGoal(goal.id)}
                                        >
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Выполнить
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 px-2"
                                        onClick={() => setEditingGoal(goal)}
                                    >
                                        <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 px-2 hover:bg-red-50"
                                        onClick={() => handleDeleteGoal(goal.id)}
                                    >
                                        <Trash2 className="w-3 h-3 text-red-600" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {goals.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Цели еще не созданы</p>
                            <p className="text-sm mt-1">Создайте первую цель для игроков</p>
                        </div>
                    )}
                </div>
            )}

            <GoalModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateGoal}
                title="Создать цель"
                players={players}
                factions={factions}
            />

            <GoalModal
                isOpen={editingGoal !== null}
                onClose={() => setEditingGoal(null)}
                onSubmit={handleUpdateGoal}
                title="Редактировать цель"
                players={players}
                factions={factions}
                initialData={
                    editingGoal
                        ? {
                              title: editingGoal.title,
                              description: editingGoal.description,
                              goal_type: editingGoal.goalType,
                              faction_id: editingGoal.factionId || undefined,
                              player_id: editingGoal.playerId || undefined,
                              influence_points_reward: editingGoal.influencePointsReward,
                          }
                        : undefined
                }
                isEdit
            />
        </>
    );
};
