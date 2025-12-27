import { Outlet } from 'react-router';
import { Header } from '../../../widgets/header';
import { BottomMenu } from '../../../widgets/bottom-menu';
import styles from './styles.module.css';

interface LayoutProps {
    isAdmin?: boolean;
}

export const Layout = ({ isAdmin = false }: LayoutProps) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <BottomMenu isAdmin={isAdmin} />
        </div>
    );
};
