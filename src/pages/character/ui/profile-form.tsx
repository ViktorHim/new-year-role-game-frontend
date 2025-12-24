import { BanknotesIcon, StarIcon } from '@heroicons/react/16/solid';
import { ProfileAvatar } from './avatar';
import { useAuth } from '@/features/auth';

interface ProfileFormProps {
    avatar?: string;
    fraction?: string;
    money: number;
    influence: number;
    onMoneyClick?: () => void;
}

export const ProfileForm = ({
    avatar,
    fraction,
    money,
    influence,
    onMoneyClick,
}: ProfileFormProps) => {
    const { user } = useAuth();

    return (
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex flex-col items-center gap-3">
                <ProfileAvatar fallbackText={user!.name[0]} />

                <h1 className="text-xl font-bold text-slate-900">{user?.name}</h1>

                {(user?.game_role || fraction) && (
                    <p className="text-sm text-slate-500">
                        {user?.game_role && fraction
                            ? `${user?.game_role} • ${fraction}`
                            : user?.game_role || fraction}
                    </p>
                )}

                {/* Статистика - карточки в ряд */}
                <div className="w-full grid grid-cols-2 gap-3 mt-2">
                    <div
                        className="bg-amber-50 rounded-xl p-4 cursor-pointer hover:bg-amber-100 transition-colors"
                        onClick={onMoneyClick}
                    >
                        <div className="text-2xl font-bold text-amber-600 flex items-center gap-2">
                            {money} <BanknotesIcon style={{ height: 20, width: 20 }} />
                        </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-purple-600 flex items-center gap-2">
                            {influence} <StarIcon style={{ height: 20, width: 20 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
