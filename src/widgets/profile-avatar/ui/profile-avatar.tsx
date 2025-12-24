import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';

interface ProfileAvatarProps {
    fallbackText: string;
    src?: string | null;
    size?: 'sm' | 'md' | 'lg';
}

export const ProfileAvatar = ({ fallbackText, src, size = 'lg' }: ProfileAvatarProps) => {
    const sizeClasses = {
        sm: 'w-10 h-10',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    };

    return (
        <div className={`${sizeClasses[size]} flex-shrink-0`}>
            <Avatar className="w-full h-full">
                {src ? (
                    <AvatarImage src={src} alt={fallbackText} />
                ) : (
                    <AvatarFallback className="bg-slate-300 text-slate-700 text-lg font-semibold">
                        {fallbackText}
                    </AvatarFallback>
                )}
            </Avatar>
        </div>
    );
};
