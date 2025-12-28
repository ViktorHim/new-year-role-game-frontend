import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';
import { GoalCard } from './goal-card';
import { GoalModal } from './goal-modal';
import { DeleteConfirmModal } from './delete-confirm-modal';

export interface Goal {
    id: number;
    description: string;
    isCompleted: boolean;
    dependsOnId?: number;
}

interface GoalsManagerProps {
    goals: Goal[];
    onUpdate: (goals: Goal[]) => void;
}

export const GoalsManager = ({ goals, onUpdate }: GoalsManagerProps) => {
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const [deletingGoalId, setDeletingGoalId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = (data: Omit<Goal, 'id'>) => {
        const newGoal: Goal = {
            ...data,
            id: Math.max(0, ...goals.map((g) => g.id)) + 1,
        };
        onUpdate([...goals, newGoal]);
        setIsCreating(false);
    };

    const handleEdit = (data: Omit<Goal, 'id'>) => {
        if (editingGoal) {
            onUpdate(
                goals.map((goal) => (goal.id === editingGoal.id ? { ...data, id: editingGoal.id } : goal))
            );
            setEditingGoal(null);
        }
    };

    const handleDelete = () => {
        if (deletingGoalId !== null) {
            onUpdate(goals.filter((goal) => goal.id !== deletingGoalId));
            setDeletingGoalId(null);
        }
    };

    const handleToggle = (id: number) => {
        onUpdate(
            goals.map((goal) =>
                goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal
            )
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Цели (Goals)</CardTitle>
                <CardDescription>Управление целями игрока</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {goals.map((goal) => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            allGoals={goals}
                            onEdit={() => setEditingGoal(goal)}
                            onDelete={() => setDeletingGoalId(goal.id)}
                            onToggle={() => handleToggle(goal.id)}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setIsCreating(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить цель
                </Button>

                <GoalModal
                    isOpen={isCreating}
                    onClose={() => setIsCreating(false)}
                    onSave={handleCreate}
                    allGoals={goals}
                    title="Создать цель"
                />

                <GoalModal
                    isOpen={editingGoal !== null}
                    onClose={() => setEditingGoal(null)}
                    onSave={handleEdit}
                    allGoals={goals}
                    initialData={editingGoal || undefined}
                    title="Редактировать цель"
                />

                <DeleteConfirmModal
                    isOpen={deletingGoalId !== null}
                    onClose={() => setDeletingGoalId(null)}
                    onConfirm={handleDelete}
                    title="Удалить цель?"
                    description="Это действие нельзя будет отменить. Зависимые цели потеряют связь."
                />
            </CardContent>
        </Card>
    );
};
