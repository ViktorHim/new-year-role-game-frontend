import { BanknotesIcon } from '@heroicons/react/16/solid';

interface MoneyCardProps {
    money: number | null;
    onClick: () => void;
}

export const MoneyCard = ({ money, onClick }: MoneyCardProps) => {
    return (
        <div
            className="bg-amber-50 rounded-xl p-4 cursor-pointer hover:bg-amber-100 transition-colors"
            onClick={onClick}
        >
            <div className="text-2xl font-bold text-amber-600 flex items-center gap-2">
                {money || 0} <BanknotesIcon className="h-5 w-5" />
            </div>
        </div>
    );
};
