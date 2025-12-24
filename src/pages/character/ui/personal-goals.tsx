import { Goal, type IGoal } from '@/entities/goal';

interface PersonalGoalsProps {
    goals: IGoal[];
    toggleGoal: (goalId: number | string) => void;
}

export const PersonalGoals = ({ goals, toggleGoal }: PersonalGoalsProps) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Личные цели</h2>
            <div className="space-y-2">
                {goals.map((goal) => (
                    <Goal data={goal} onToggle={toggleGoal} variant="personal" />
                ))}
            </div>
        </div>
    );
};
