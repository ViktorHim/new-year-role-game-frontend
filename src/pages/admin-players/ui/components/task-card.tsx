import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Edit, Trash2 } from 'lucide-react';
import type { Task } from './tasks-manager';

interface TaskCardProps {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
    onToggle: () => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onToggle }: TaskCardProps) => {
    return (
        <div className="p-2 border rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-2">
                <Checkbox
                    checked={task.isCompleted}
                    onCheckedChange={onToggle}
                    className="mt-0.5"
                />
                <p
                    className={`flex-1 text-sm ${task.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}
                >
                    {task.description}
                </p>
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onEdit}>
                        <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onDelete}>
                        <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
