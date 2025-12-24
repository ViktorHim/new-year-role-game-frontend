interface PlayerStoryProps {
    story: string;
}

export const PlayerStory = ({ story }: PlayerStoryProps) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">История персонажа</h2>
            <p className="text-slate-700 leading-relaxed">{story}</p>
        </div>
    );
};
