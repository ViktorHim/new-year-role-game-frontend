import { Loader2 } from 'lucide-react';

export const PageLoader = () => {
    return (
        <div className="flex items-center justify-center w-full" style={{ height: 'calc(100vh - 120px)' }}>
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                <p className="text-sm text-slate-600">Загрузка...</p>
            </div>
        </div>
    );
};
