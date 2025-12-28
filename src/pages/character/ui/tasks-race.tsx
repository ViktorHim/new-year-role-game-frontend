import { useTasks } from '@/entities/task/store';
import { Goal } from '@/entities/goal';
import { Title } from '@/shared/ui/title';

export const TasksRace = () => {
    const { tasks, toggleTask } = useTasks();

    if (!tasks || tasks.length === 0) {
        return null;
    }

    return (
        <div className="mb-2">
            <Title tier={2} classname="mb-3">
                Ваши наблюдения
            </Title>
            <div className="space-y-2">
                {tasks.map((task) => (
                    <Goal
                        key={task.id}
                        data={{
                            id: task.id,
                            description: task.description,
                            isCompleted: task.isCompleted,
                            reward: 0,
                        }}
                        onToggle={() => toggleTask(task.id, !task.isCompleted)}
                        variant="personal"
                    />
                ))}
            </div>
        </div>
    );
};
