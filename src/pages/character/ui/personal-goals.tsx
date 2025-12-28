import { useAvaiblePersonalGoals, useGoals } from '@/entities/goal/store';
import { Goal } from '@/entities/goal';
import { Title } from '@/shared/ui/title';
import { GoalRollbackModal } from '@/widgets/goal-rollback-modal';
import { LocalStorageKeys } from '@/shared/config';
import { useState } from 'react';

export const PersonalGoals = () => {
    const { togglePersonalGoal } = useGoals();
    const goals = useAvaiblePersonalGoals();
    const [pendingGoalToggle, setPendingGoalToggle] = useState<{
        id: number;
        isCompleted: boolean;
    } | null>(null);

    const handleGoalToggle = (id: number, isCompleted: boolean) => {
        const goal = goals.find((g) => g.id === id);
        if (!goal) return;

        const isUnchecking = goal.isCompleted && !isCompleted;
        const hasSeenWarning = localStorage.getItem(LocalStorageKeys.GOAL_ROLLBACK_WARNING_SHOWN);

        if (isUnchecking && !hasSeenWarning) {
            setPendingGoalToggle({ id, isCompleted });
        } else {
            togglePersonalGoal(id, isCompleted);
        }
    };

    const handleConfirmRollback = () => {
        if (pendingGoalToggle) {
            togglePersonalGoal(pendingGoalToggle.id, pendingGoalToggle.isCompleted);
            setPendingGoalToggle(null);
        }
    };

    const handleCancelRollback = () => {
        setPendingGoalToggle(null);
    };

    return (
        <div className="mb-2">
            <Title tier={2} classname="mb-3">
                Личные цели
            </Title>
            <div className="space-y-2">
                {goals.map((goal) => (
                    <Goal
                        key={goal.id}
                        data={goal}
                        onToggle={() => handleGoalToggle(goal.id, !goal.isCompleted)}
                        variant="personal"
                    />
                ))}
            </div>

            <GoalRollbackModal
                isOpen={pendingGoalToggle !== null}
                onConfirm={handleConfirmRollback}
                onCancel={handleCancelRollback}
            />
        </div>
    );
};
