import { Goal, type IGoal } from '@/entities/goal';

interface TeamGoalsProps {
    goals: IGoal[];
    toggleGoal: (goalId: number | string) => void;
}

export const TeamGoals = ({ goals, toggleGoal }: TeamGoalsProps) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Командные цели</h2>
            <div className="space-y-2">
                {goals.map((goal) => (
                    <Goal data={goal} onToggle={toggleGoal} variant="faction" />
                ))}
            </div>
        </div>
    );
};
