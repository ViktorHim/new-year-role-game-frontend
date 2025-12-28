import { Download } from 'lucide-react';
import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import map from '@shared/assets/images/map.jpg';

export const MapPage = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = map;
        link.download = 'game-map.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Page>
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <Title classname="mb-0">Карта</Title>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Скачать карту
                    </button>
                </div>
                <img src={map} alt="Карта игры" className="w-full" />
            </div>
        </Page>
    );
};
