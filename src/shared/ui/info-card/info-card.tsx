import type { ReactNode } from 'react';

interface InfoCardProps {
    children: ReactNode;
    variant?: 'info' | 'warning' | 'success' | 'error';
    showIcon?: boolean;
    className?: string;
}

export const InfoCard = ({
    children,
    variant = 'info',
    showIcon = false,
    className = '',
}: InfoCardProps) => {
    const variants = {
        info: {
            container: 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200',
            text: 'text-slate-700',
        },
        warning: {
            container: 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200',
            text: 'text-slate-700',
        },
        success: {
            container: 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200',
            text: 'text-slate-700',
        },
        error: {
            container: 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200',
            text: 'text-slate-700',
        },
    };

    const styles = variants[variant];

    return (
        <div className={`${styles.container} rounded-lg p-4 ${className}`}>
            {showIcon ? (
                <div className="flex items-start gap-3">
                    <p className={`${styles.text} leading-relaxed flex-1`}>{children}</p>
                </div>
            ) : (
                <p className={`${styles.text} leading-relaxed`}>{children}</p>
            )}
        </div>
    );
};
