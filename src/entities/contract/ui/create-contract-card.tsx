import { Plus } from 'lucide-react';

interface CreateContractCardProps {
    onClick: () => void;
}

export const CreateContractCard = ({ onClick }: CreateContractCardProps) => {
    const mainColor = 'slate';

    return (
        <button
            onClick={onClick}
            className={`w-full bg-${mainColor}-50 border-2 border-dashed border-${mainColor}-300 rounded-lg px-4 py-3 hover:bg-purple-100 hover:border-purple-400 transition-all`}
        >
            <div className="flex items-center gap-4">
                <div
                    className={`w-10 h-10 rounded-full bg-${mainColor}-200 flex items-center justify-center flex-shrink-0`}
                >
                    <Plus className={`w-5 h-5 text-${mainColor}-600`} />
                </div>

                <div className="text-left">
                    <h3 className="text-sm font-semibold text-slate-900">Создать договор</h3>
                    <p className={`text-xs text-${mainColor}-600`}>Новый договор с игроком</p>
                </div>
            </div>
        </button>
    );
};
