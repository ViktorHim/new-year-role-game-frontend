import { StarIcon } from '@heroicons/react/16/solid';

export interface InfluenceCardProps {
    influence: number | null;
}

export const InfluenceCard = ({ influence }: InfluenceCardProps) => {
    return (
        <div className="bg-purple-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-600 flex items-center gap-2">
                {influence || 0} <StarIcon className="h-5 w-5" />
            </div>
        </div>
    );
};
