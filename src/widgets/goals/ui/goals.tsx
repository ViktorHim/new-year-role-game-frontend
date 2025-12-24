import { Goal, type GoalVariant, type IGoal } from '@/entities/goal';

interface GoalsProps {
    goals: IGoal[];
    toggleGoal: (goalId: number | string) => void;
    variant: GoalVariant;
}

export const Goals = ({ goals, toggleGoal, variant }: GoalsProps) => {
    return (
        <div className="space-y-2">
            {goals.map((goal) => (
                <Goal data={goal} onToggle={toggleGoal} variant={variant} disabled={false} />
            ))}
        </div>
    );
};
