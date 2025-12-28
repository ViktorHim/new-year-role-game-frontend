import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { useEffect, useState } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    Loader2,
    ListTodo,
    Package,
    PlayCircle,
    PauseCircle,
    Award,
    Coins,
} from 'lucide-react';
import { useAppStore } from '@/app/store';
import { TaskBlockModal } from '../modals/task-block-modal';
import { TaskModal } from '../modals/task-modal';
import type { ITaskBlock, IAdminTask } from '@/entities/admin';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

export const TasksTab = () => {
    const {
        tasks,
        taskBlocks,
        players,
        isLoadingTasks,
        getTaskBlocks,
        getTasks,
        getPlayers,
        createTaskBlock,
        updateTaskBlock,
        deleteTaskBlock,
        createTask,
        updateTask,
        deleteTask,
        activateTask,
        deactivateTask,
    } = useAppStore((state) => state.admin);

    const [isCreateBlockModalOpen, setIsCreateBlockModalOpen] = useState(false);
    const [editingBlock, setEditingBlock] = useState<ITaskBlock | null>(null);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<IAdminTask | null>(null);
    const [selectedBlockId, setSelectedBlockId] = useState<string>('all');

    useEffect(() => {
        getTaskBlocks();
        getTasks();
        getPlayers();
    }, [getTaskBlocks, getTasks, getPlayers]);

    const handleCreateBlock = async (data: { name: string; description: string }) => {
        await createTaskBlock(data);
        setIsCreateBlockModalOpen(false);
    };

    const handleUpdateBlock = async (data: { name: string; description: string }) => {
        if (editingBlock) {
            await updateTaskBlock(editingBlock.id, data);
            setEditingBlock(null);
        }
    };

    const handleDeleteBlock = async (id: number) => {
        const tasksInBlock = tasks.filter((t) => t.taskBlockId === id);

        if (tasksInBlock.length > 0) {
            if (
                !window.confirm(
                    `В этом блоке ${tasksInBlock.length} задач(и). При удалении блока все задачи тоже будут удалены. Продолжить?`
                )
            ) {
                return;
            }
        } else {
            if (!window.confirm('Вы уверены, что хотите удалить этот блок?')) {
                return;
            }
        }

        await deleteTaskBlock(id);
    };

    const handleCreateTask = async (data: {
        task_block_id: number;
        title: string;
        description: string;
        task_order: number;
        influence_points_reward: number;
        money_reward: number;
    }) => {
        await createTask(data);
        setIsCreateTaskModalOpen(false);
    };

    const handleUpdateTask = async (data: {
        title?: string;
        description?: string;
        task_order?: number;
        influence_points_reward?: number;
        money_reward?: number;
    }) => {
        if (editingTask) {
            await updateTask(editingTask.id, data);
            setEditingTask(null);
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            await deleteTask(id);
        }
    };

    const handleActivateTask = async (taskId: number) => {
        const selectedPlayers = window.prompt(
            'Введите ID игроков через запятую (или оставьте пустым для всех):'
        );

        if (selectedPlayers === null) return;

        const playerIds =
            selectedPlayers.trim() === ''
                ? players.map((p) => p.id)
                : selectedPlayers
                      .split(',')
                      .map((id) => parseInt(id.trim()))
                      .filter((id) => !isNaN(id));

        if (playerIds.length > 0) {
            await activateTask(taskId, { player_ids: playerIds });
        }
    };

    const handleDeactivateTask = async (taskId: number) => {
        if (window.confirm('Деактивировать эту задачу для всех игроков?')) {
            await deactivateTask(taskId);
        }
    };

    const filteredTasks =
        selectedBlockId === 'all'
            ? tasks
            : tasks.filter((t) => t.taskBlockId === parseInt(selectedBlockId));

    return (
        <div className="space-y-6">
            {/* Task Blocks Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Блоки задач
                    </h3>
                    <Button
                        onClick={() => setIsCreateBlockModalOpen(true)}
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Создать блок
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {taskBlocks.map((block) => (
                        <Card key={block.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-base">{block.name}</CardTitle>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0"
                                            onClick={() => setEditingBlock(block)}
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0 hover:bg-red-50"
                                            onClick={() => handleDeleteBlock(block.id)}
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-slate-600">{block.description}</p>
                                <div className="mt-2 text-xs text-slate-500">
                                    Задач: {tasks.filter((t) => t.taskBlockId === block.id).length}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Tasks Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <ListTodo className="w-5 h-5" />
                            Задачи
                        </h3>
                        <Select value={selectedBlockId} onValueChange={setSelectedBlockId}>
                            <SelectTrigger className="w-48 h-8 text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все блоки</SelectItem>
                                {taskBlocks.map((block) => (
                                    <SelectItem key={block.id} value={block.id.toString()}>
                                        {block.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        onClick={() => setIsCreateTaskModalOpen(true)}
                        size="sm"
                        className="flex items-center gap-2"
                        disabled={taskBlocks.length === 0}
                    >
                        <Plus className="w-4 h-4" />
                        Создать задачу
                    </Button>
                </div>

                {isLoadingTasks ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTasks
                            .sort((a, b) => a.taskOrder - b.taskOrder)
                            .map((task) => (
                                <Card key={task.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <Badge variant="outline" className="text-xs">
                                                #{task.taskOrder}
                                            </Badge>
                                            {task.isActive ? (
                                                <Badge className="bg-green-100 text-green-700 text-xs">
                                                    Активна
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-xs">
                                                    Неактивна
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-base">{task.title}</CardTitle>
                                        <div className="text-xs text-slate-500 mt-1">
                                            {task.taskBlockName}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <p className="text-sm text-slate-600 line-clamp-2">
                                            {task.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <Badge variant="outline" className="text-xs">
                                                <Award className="w-3 h-3 mr-1" />
                                                +{task.influencePointsReward} ОВ
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                                <Coins className="w-3 h-3 mr-1" />
                                                +{task.moneyReward} ₽
                                            </Badge>
                                        </div>

                                        <div className="flex gap-1">
                                            {task.isActive ? (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 h-7 text-xs"
                                                    onClick={() => handleDeactivateTask(task.id)}
                                                >
                                                    <PauseCircle className="w-3 h-3 mr-1" />
                                                    Деактивировать
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 h-7 text-xs text-green-600"
                                                    onClick={() => handleActivateTask(task.id)}
                                                >
                                                    <PlayCircle className="w-3 h-3 mr-1" />
                                                    Активировать
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 px-2"
                                                onClick={() => setEditingTask(task)}
                                            >
                                                <Edit className="w-3 h-3" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 px-2 hover:bg-red-50"
                                                onClick={() => handleDeleteTask(task.id)}
                                            >
                                                <Trash2 className="w-3 h-3 text-red-600" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                        {filteredTasks.length === 0 && (
                            <div className="col-span-full text-center py-12 text-slate-500">
                                <ListTodo className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>Задачи еще не созданы</p>
                                <p className="text-sm mt-1">Создайте первую задачу</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <TaskBlockModal
                isOpen={isCreateBlockModalOpen}
                onClose={() => setIsCreateBlockModalOpen(false)}
                onSubmit={handleCreateBlock}
                title="Создать блок задач"
            />

            <TaskBlockModal
                isOpen={editingBlock !== null}
                onClose={() => setEditingBlock(null)}
                onSubmit={handleUpdateBlock}
                title="Редактировать блок"
                initialData={
                    editingBlock
                        ? { name: editingBlock.name, description: editingBlock.description }
                        : undefined
                }
            />

            <TaskModal
                isOpen={isCreateTaskModalOpen}
                onClose={() => setIsCreateTaskModalOpen(false)}
                onSubmit={handleCreateTask}
                title="Создать задачу"
                taskBlocks={taskBlocks}
            />

            <TaskModal
                isOpen={editingTask !== null}
                onClose={() => setEditingTask(null)}
                onSubmit={handleUpdateTask}
                title="Редактировать задачу"
                taskBlocks={taskBlocks}
                initialData={
                    editingTask
                        ? {
                              task_block_id: editingTask.taskBlockId,
                              title: editingTask.title,
                              description: editingTask.description,
                              task_order: editingTask.taskOrder,
                              influence_points_reward: editingTask.influencePointsReward,
                              money_reward: editingTask.moneyReward,
                          }
                        : undefined
                }
                isEdit
            />
        </div>
    );
};
