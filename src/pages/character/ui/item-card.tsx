import { PhotoIcon } from '@heroicons/react/24/outline';

interface ItemCardProps {
    id: number | string;
    name: string;
    description: string;
    image?: string;
    onClick?: (id: number | string) => void;
    className?: string;
}

export const ItemCard = ({
    id,
    name,
    description,
    image,
    onClick,
    className = '',
}: ItemCardProps) => {
    return (
        <div
            onClick={() => onClick?.(id)}
            className={`flex gap-3 bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:border-slate-300 hover:shadow-md transition-all ${className}`}
        >
            {/* Изображение слева */}
            <div className="w-24 h-24 flex-shrink-0 bg-slate-100 flex items-center justify-center">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <PhotoIcon style={{ height: '80%', width: '80%', color: 'gray' }} />
                )}
            </div>

            {/* Текст справа */}
            <div className="flex-1 py-3 pr-3 flex flex-col justify-center min-w-0">
                <h3 className="font-semibold text-slate-900 text-base mb-1 truncate">{name}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{description}</p>
            </div>
        </div>
    );
};
