import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid';
import styles from './styles.module.css';
import { useAuth } from '@/features/auth';

export const Header = () => {
    const { user, logout } = useAuth();
    return (
        <header className={styles.header}>
            <p className={styles.text}>
                {user?.name} ({user?.game_role})
            </p>
            <ArrowRightStartOnRectangleIcon
                onClick={logout}
                fill="white"
                style={{ width: 20, height: 20 }}
            />
        </header>
    );
};
