import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../../../widgets/header';
import { BottomMenu } from '../../../widgets/bottom-menu';
import { PageLoader } from '../../../shared/ui/page-loader';
import { ScrollToTop } from '../../router/scroll-to-top';
import styles from './styles.module.css';

interface LayoutProps {
    isAdmin?: boolean;
}

export const Layout = ({ isAdmin = false }: LayoutProps) => {
    return (
        <div className={styles.layout}>
            <ScrollToTop />
            <Header />
            <main className={styles.main}>
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </main>
            <BottomMenu isAdmin={isAdmin} />
        </div>
    );
};
