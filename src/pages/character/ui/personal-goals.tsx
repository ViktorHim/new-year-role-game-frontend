import { Goal, type IGoal } from '@/entities/goal';
import { useState } from 'react';

interface PersonalGoalsProps {
    goals: IGoal[];
    toggleGoal: (goalId: number | string) => void;
}

export const PersonalGoals = () => {
    const [goals, setGoals] = useState(mockPlayerData.personalGoals);

    const toggleGoal = (goalId) => {
        setGoals((prev) =>
            prev.map((goal) =>
                goal.id === goalId ? { ...goal, completed: !goal.completed } : goal,
            ),
        );
    };

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
