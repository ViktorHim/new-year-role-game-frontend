import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import styles from './styles.module.css';
import clsx from 'clsx';

interface ProfileAvatarProps {
    src?: string;
    fallbackText: string;
    classname?: string;
}

export const ProfileAvatar = ({ src, fallbackText, classname }: ProfileAvatarProps) => {
    return (
        <div className="w-24 h-24 flex-shrink-0">
            <Avatar className={clsx(styles.avatar, classname)}>
                <AvatarImage src={src} alt="avatar" />
                <AvatarFallback>{fallbackText}</AvatarFallback>
            </Avatar>
        </div>
    );
};
