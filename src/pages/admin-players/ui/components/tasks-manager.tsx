import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Plus, Users } from 'lucide-react';
import { TaskBlockManager } from './task-block-manager';

export interface Task {
    id: number;
    description: string;
    isCompleted: boolean;
}

export interface TaskBlock {
    id: number;
    blockNumber: number;
    currentPlayerTasks: Task[];
    selectedPlayerTasks: Task[];
}

interface TasksManagerProps {
    taskBlocks: TaskBlock[];
    selectedPlayerId: number | null;
    availablePlayers: Array<{ id: number; name: string }>;
    onUpdate: (taskBlocks: TaskBlock[]) => void;
    onPlayerSelect: (playerId: number | null) => void;
}

export const TasksManager = ({
    taskBlocks,
    selectedPlayerId,
    availablePlayers,
    onUpdate,
    onPlayerSelect,
}: TasksManagerProps) => {
    const handleAddBlock = () => {
        if (!selectedPlayerId) return;

        const newBlock: TaskBlock = {
            id: Math.max(0, ...taskBlocks.map((b) => b.id)) + 1,
            blockNumber: taskBlocks.length + 1,
            currentPlayerTasks: [],
            selectedPlayerTasks: [],
        };
        onUpdate([...taskBlocks, newBlock]);
    };

    const handleUpdateBlock = (blockId: number, updates: Partial<TaskBlock>) => {
        onUpdate(
            taskBlocks.map((block) =>
                block.id === blockId ? { ...block, ...updates } : block
            )
        );
    };

    const handleDeleteBlock = (blockId: number) => {
        onUpdate(taskBlocks.filter((block) => block.id !== blockId));
    };

    const selectedPlayer = availablePlayers.find((p) => p.id === selectedPlayerId);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Задачи (Tasks) - Гонка целей</CardTitle>
                <CardDescription>Управление задачами для игроков</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Игрок для гонки целей
                    </Label>
                    <Select
                        value={selectedPlayerId?.toString() || ''}
                        onValueChange={(value) => onPlayerSelect(value ? Number(value) : null)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите игрока" />
                        </SelectTrigger>
                        <SelectContent>
                            {availablePlayers.map((player) => (
                                <SelectItem key={player.id} value={player.id.toString()}>
                                    {player.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedPlayerId && selectedPlayer && (
                    <>
                        <div className="space-y-4">
                            {taskBlocks.map((block) => (
                                <TaskBlockManager
                                    key={block.id}
                                    block={block}
                                    selectedPlayerName={selectedPlayer.name}
                                    onUpdate={(updates) => handleUpdateBlock(block.id, updates)}
                                    onDelete={() => handleDeleteBlock(block.id)}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleAddBlock}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Добавить блок задач
                        </Button>
                    </>
                )}

                {!selectedPlayerId && (
                    <div className="text-center p-8 text-slate-500">
                        Выберите игрока для начала работы с задачами
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
