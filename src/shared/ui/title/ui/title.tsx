import clsx from 'clsx';
import type { ReactNode } from 'react';

interface TitleProps {
    children?: ReactNode;
    tier?: 1 | 2 | 3;
    classname?: string;
}

export const Title = ({ children, tier = 1, classname = '' }: TitleProps) => {
    const titleStyle = {
        '1': 'text-2xl',
        '2': 'text-xl',
        '3': 'text-lg',
    };

    return (
        <h2 className={clsx('font-bold text-slate-800', titleStyle[tier], classname)}>
            {children}
        </h2>
    );
};
