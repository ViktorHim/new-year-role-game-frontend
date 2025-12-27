import { Plus } from 'lucide-react';

interface CreateContractCardProps {
    onClick: () => void;
}

export const CreateContractCard = ({ onClick }: CreateContractCardProps) => {
    return (
        <button
            onClick={onClick}
            className="w-full bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-6 hover:bg-purple-100 hover:border-purple-400 transition-all"
        >
            <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-purple-900">Создать договор</h3>
                    <p className="text-sm text-purple-600 mt-1">
                        Заключить новый договор с игроком
                    </p>
                </div>
            </div>
        </button>
    );
};
