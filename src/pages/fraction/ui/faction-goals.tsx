import { Goal } from '@/entities/goal';
import { useGoals } from '@/entities/goal/store';
import { Title } from '@/shared/ui/title';
import { GoalRollbackModal } from '@/widgets/goal-rollback-modal';
import { LocalStorageKeys } from '@/shared/config';
import { useState } from 'react';

interface FactionGoalsProps {
    disabled?: boolean;
}

export const FactionGoals = ({ disabled }: FactionGoalsProps) => {
    const { factionGoals, toggleFactionGoal } = useGoals();
    const [pendingGoalToggle, setPendingGoalToggle] = useState<{
        id: number;
        isCompleted: boolean;
    } | null>(null);

    const handleGoalToggle = (id: number, isCompleted: boolean) => {
        if (disabled) return;

        const goal = factionGoals.find((g) => g.id === id);
        if (!goal) return;

        const isUnchecking = goal.isCompleted && !isCompleted;
        const hasSeenWarning = localStorage.getItem(LocalStorageKeys.GOAL_ROLLBACK_WARNING_SHOWN);

        if (isUnchecking && !hasSeenWarning) {
            setPendingGoalToggle({ id, isCompleted });
        } else {
            toggleFactionGoal(id, isCompleted);
        }
    };

    const handleConfirmRollback = () => {
        if (pendingGoalToggle) {
            toggleFactionGoal(pendingGoalToggle.id, pendingGoalToggle.isCompleted);
            setPendingGoalToggle(null);
        }
    };

    const handleCancelRollback = () => {
        setPendingGoalToggle(null);
    };

    return (
        <div className="mb-2">
            <Title tier={2} classname="mb-2">
                Командные цели
            </Title>
            <div className="space-y-2">
                {factionGoals.map((goal) => (
                    <Goal
                        key={goal.id}
                        data={goal}
                        onToggle={() => handleGoalToggle(goal.id, !goal.isCompleted)}
                        variant="faction"
                        disabled={disabled}
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
