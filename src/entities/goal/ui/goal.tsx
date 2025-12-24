import { Checkbox } from '@/shared/ui/checkbox';
import type { IGoal } from '../model/types';

export type GoalVariant = 'personal' | 'faction';
interface GoalProps {
    data: IGoal;
    onToggle: (id: number | string) => void;
    variant?: GoalVariant;
    disabled?: boolean;
    className?: string;
}

export const Goal = ({
    onToggle,
    data,
    variant = 'personal',
    disabled = false,
    className = '',
}: GoalProps) => {
    const variantStyles = {
        personal: {
            default: 'bg-white border-slate-200 hover:border-slate-300',
            completed: 'bg-green-50 border-green-300 opacity-75',
            checkbox: 'data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500',
        },
        faction: {
            default: 'bg-white border-red-200 hover:border-red-300',
            completed: 'bg-red-50 border-red-300 opacity-75',
            checkbox: 'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500',
        },
    };

    const styles = variantStyles[variant];

    const { id, description, completed } = data;

    return (
        <div
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                completed ? styles.completed : styles.default
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            onClick={() => !disabled && onToggle(id)}
        >
            <div className="flex items-start gap-3">
                <Checkbox
                    checked={completed}
                    onCheckedChange={() => !disabled && onToggle(id)}
                    disabled={disabled}
                    className={`mt-0.5 w-5 h-5 rounded border-2 ${styles.checkbox}`}
                    onClick={(e) => e.stopPropagation()}
                />
                <p className={`text-slate-700 leading-relaxed ${completed ? 'line-through' : ''}`}>
                    {description}
                </p>
            </div>
        </div>
    );
};
