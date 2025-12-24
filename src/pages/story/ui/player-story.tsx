import { Title } from '@/shared/ui/title';

interface PlayerStoryProps {
    story: string;
}

export const PlayerStory = ({ story }: PlayerStoryProps) => {
    return (
        <div className="mb-6">
            <Title classname="mb-2" tier={2}>
                История персонажа
            </Title>
            <p className="text-slate-700 leading-relaxed">{story}</p>
        </div>
    );
};
