import type { ReactNode } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

interface PageProps {
    children: ReactNode;
    centered?: boolean;
    classname?: string;
    fullHeight?: boolean;
}

export const Page = ({ children, classname, centered, fullHeight }: PageProps) => {
    return (
        <div
            className={clsx(
                styles.page,
                classname,
                centered ? styles.centered : '',
                fullHeight ? styles.fullHeight : '',
            )}
        >
            {children}
        </div>
    );
};
