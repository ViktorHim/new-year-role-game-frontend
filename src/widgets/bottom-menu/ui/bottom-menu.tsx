import styles from './styles.module.css';
import { Link, useLocation } from 'react-router';
import { menuItems } from '../config/menu-items';
import { HIGHLIGHT_COLOR, IDLE_COLOR } from '../config/colors';
export const BottomMenu = () => {
    const location = useLocation();

    return (
        <nav className={styles['bottom-menu']}>
            {menuItems.map(({ path, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                    <Link key={path} to={path} className={isActive ? styles.active : ''}>
                        <Icon
                            fill={isActive ? HIGHLIGHT_COLOR : IDLE_COLOR}
                            style={{ width: 20, height: 20 }}
                        />
                    </Link>
                );
            })}
        </nav>
    );
};
