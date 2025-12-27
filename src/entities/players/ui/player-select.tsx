import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@shared/ui/select';
import { usePlayersList } from '../model/use-players';

interface PlayerSelectProps {
    onSelect: (id: number) => void;
    value?: number;
}

export const PlayerSelect = ({ onSelect, value }: PlayerSelectProps) => {
    const playerList = usePlayersList();
    return (
        <Select
            value={value ? value.toString() : undefined}
            onValueChange={(id: string) => onSelect(parseInt(id))}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите игрока" />
            </SelectTrigger>
            <SelectContent>
                {playerList.map((player) => (
                    <SelectItem key={player.id} value={player.id.toString()}>
                        {player.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
