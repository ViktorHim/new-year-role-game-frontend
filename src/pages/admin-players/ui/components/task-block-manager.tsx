import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import type { TaskBlock, Task } from './tasks-manager';
import { TaskCard } from './task-card';
import { TaskModal } from './task-modal';
import { DeleteConfirmModal } from './delete-confirm-modal';

interface TaskBlockManagerProps {
    block: TaskBlock;
    selectedPlayerName: string;
    onUpdate: (updates: Partial<TaskBlock>) => void;
    onDelete: () => void;
}

export const TaskBlockManager = ({
    block,
    selectedPlayerName,
    onUpdate,
    onDelete,
}: TaskBlockManagerProps) => {
    const [creatingFor, setCreatingFor] = useState<'current' | 'selected' | null>(null);
    const [editingTask, setEditingTask] = useState<{
        task: Task;
        playerType: 'current' | 'selected';
    } | null>(null);
    const [deletingTask, setDeletingTask] = useState<{
        taskId: number;
        playerType: 'current' | 'selected';
    } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleCreateTask = (description: string, playerType: 'current' | 'selected') => {
        const tasks =
            playerType === 'current' ? block.currentPlayerTasks : block.selectedPlayerTasks;
        const newTask: Task = {
            id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
            description,
            isCompleted: false,
        };

        if (playerType === 'current') {
            onUpdate({ currentPlayerTasks: [...tasks, newTask] });
        } else {
            onUpdate({ selectedPlayerTasks: [...tasks, newTask] });
        }
        setCreatingFor(null);
    };

    const handleEditTask = (description: string, playerType: 'current' | 'selected') => {
        if (!editingTask) return;

        const tasks =
            playerType === 'current' ? block.currentPlayerTasks : block.selectedPlayerTasks;
        const updatedTasks = tasks.map((t) =>
            t.id === editingTask.task.id ? { ...t, description } : t
        );

        if (playerType === 'current') {
            onUpdate({ currentPlayerTasks: updatedTasks });
        } else {
            onUpdate({ selectedPlayerTasks: updatedTasks });
        }
        setEditingTask(null);
    };

    const handleDeleteTask = () => {
        if (!deletingTask) return;

        const tasks =
            deletingTask.playerType === 'current'
                ? block.currentPlayerTasks
                : block.selectedPlayerTasks;
        const updatedTasks = tasks.filter((t) => t.id !== deletingTask.taskId);

        if (deletingTask.playerType === 'current') {
            onUpdate({ currentPlayerTasks: updatedTasks });
        } else {
            onUpdate({ selectedPlayerTasks: updatedTasks });
        }
        setDeletingTask(null);
    };

    const handleToggleTask = (taskId: number, playerType: 'current' | 'selected') => {
        const tasks =
            playerType === 'current' ? block.currentPlayerTasks : block.selectedPlayerTasks;
        const updatedTasks = tasks.map((t) =>
            t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
        );

        if (playerType === 'current') {
            onUpdate({ currentPlayerTasks: updatedTasks });
        } else {
            onUpdate({ selectedPlayerTasks: updatedTasks });
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Блок задач #{block.blockNumber}</CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsDeleting(true)}
                        >
                            <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Задачи текущего игрока */}
                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-slate-700">
                            Задачи текущего игрока
                        </h4>
                        <div className="space-y-2">
                            {block.currentPlayerTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={() => setEditingTask({ task, playerType: 'current' })}
                                    onDelete={() =>
                                        setDeletingTask({ taskId: task.id, playerType: 'current' })
                                    }
                                    onToggle={() => handleToggleTask(task.id, 'current')}
                                />
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-3"
                            onClick={() => setCreatingFor('current')}
                        >
                            <Plus className="w-3 h-3 mr-2" />
                            Добавить задачу
                        </Button>
                    </div>

                    {/* Задачи выбранного игрока */}
                    <div>
                        <h4 className="text-sm font-semibold mb-3 text-slate-700">
                            Задачи для {selectedPlayerName}
                        </h4>
                        <div className="space-y-2">
                            {block.selectedPlayerTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={() => setEditingTask({ task, playerType: 'selected' })}
                                    onDelete={() =>
                                        setDeletingTask({ taskId: task.id, playerType: 'selected' })
                                    }
                                    onToggle={() => handleToggleTask(task.id, 'selected')}
                                />
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-3"
                            onClick={() => setCreatingFor('selected')}
                        >
                            <Plus className="w-3 h-3 mr-2" />
                            Добавить задачу
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Create Modal */}
            {creatingFor && (
                <TaskModal
                    isOpen={true}
                    onClose={() => setCreatingFor(null)}
                    onSave={(desc) => handleCreateTask(desc, creatingFor)}
                    title="Создать задачу"
                />
            )}

            {/* Edit Modal */}
            {editingTask && (
                <TaskModal
                    isOpen={true}
                    onClose={() => setEditingTask(null)}
                    onSave={(desc) => handleEditTask(desc, editingTask.playerType)}
                    initialData={editingTask.task}
                    title="Редактировать задачу"
                />
            )}

            {/* Delete Task Modal */}
            {deletingTask && (
                <DeleteConfirmModal
                    isOpen={true}
                    onClose={() => setDeletingTask(null)}
                    onConfirm={handleDeleteTask}
                    title="Удалить задачу?"
                    description="Это действие нельзя будет отменить."
                />
            )}

            {/* Delete Block Modal */}
            <DeleteConfirmModal
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={onDelete}
                title="Удалить блок задач?"
                description="Все задачи в этом блоке будут удалены."
            />
        </>
    );
};
