import { Page } from '@/shared/ui';
import { PhotoIcon } from '@heroicons/react/16/solid';

export const MapPage = () => {
    return (
        <Page>
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 mb-3">Карта</h2>
                <PhotoIcon style={{ width: '80%' }} />
                <p className="text-slate-700 leading-relaxed">{`текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст 
                    текст текст текст текст`}</p>
            </div>
        </Page>
    );
};
