import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Edit, Trash2, Link as LinkIcon } from 'lucide-react';
import type { Goal } from './goals-manager';

interface GoalCardProps {
    goal: Goal;
    allGoals: Goal[];
    onEdit: () => void;
    onDelete: () => void;
    onToggle: () => void;
}

export const GoalCard = ({ goal, allGoals, onEdit, onDelete, onToggle }: GoalCardProps) => {
    const dependsOn = goal.dependsOnId
        ? allGoals.find((g) => g.id === goal.dependsOnId)
        : null;

    return (
        <div className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3">
                <Checkbox
                    checked={goal.isCompleted}
                    onCheckedChange={onToggle}
                    className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                    <p
                        className={`text-sm ${goal.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}
                    >
                        {goal.description}
                    </p>
                    {dependsOn && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                            <LinkIcon className="w-3 h-3" />
                            <span>
                                Зависит от: <span className="font-medium">{dependsOn.description}</span>
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={onEdit}>
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onDelete}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
