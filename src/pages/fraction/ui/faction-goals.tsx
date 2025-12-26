import { Goal } from '@/entities/goal';
import { useGoals } from '@/entities/goal/store';
import { Title } from '@/shared/ui/title';

export const FactionGoals = () => {
    const { factionGoals, toggleFactionGoal } = useGoals();

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
                        onToggle={() => toggleFactionGoal(goal.id, !goal.isCompleted)}
                        variant="faction"
                    />
                ))}
            </div>
        </div>
    );
};
