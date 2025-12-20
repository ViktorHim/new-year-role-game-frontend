import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import clsx from 'clsx';

interface PageWrapperProps {
    title?: string;
    children?: ReactNode;
    className?: string; // для кастомных стилей
}

export const PageWrapper = ({ title, children, className }: PageWrapperProps) => {
    return (
        <Card className={clsx('w-full max-w-3xl mx-auto', className)}>
            {title && (
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                </CardHeader>
            )}

            <CardContent>{children}</CardContent>
        </Card>
    );
};
