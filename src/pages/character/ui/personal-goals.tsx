import { useGoals } from '@/entities/goal/store';
import { Goal } from '@/entities/goal';
import { Title } from '@/shared/ui/title';

export const PersonalGoals = () => {
    const { personalGoals, togglePersonalGoal } = useGoals();

    return (
        <div className="mb-2">
            <Title tier={2} classname="mb-3">
                Личные цели
            </Title>
            <div className="space-y-2">
                {personalGoals.map((goal) => (
                    <Goal
                        key={goal.id}
                        data={goal}
                        onToggle={() => togglePersonalGoal(goal.id, !goal.isCompleted)}
                        variant="personal"
                    />
                ))}
            </div>
        </div>
    );
};
