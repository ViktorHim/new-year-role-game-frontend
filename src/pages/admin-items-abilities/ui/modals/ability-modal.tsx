import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Checkbox } from '@/shared/ui/checkbox';
import { Zap, User } from 'lucide-react';
import type { IAdminAbility, IAdminPlayer } from '@/entities/admin';

interface AbilityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: {
        player_id: number;
        name: string;
        description?: string;
        ability_type: 'reveal_info' | 'add_influence' | 'transfer_influence';
        cooldown_minutes?: number;
        start_delay_minutes?: number;
        required_influence_points?: number;
        is_unlocked?: boolean;
        influence_points_to_add?: number;
        influence_points_to_remove?: number;
        influence_points_to_self?: number;
    }) => void;
    ability?: IAdminAbility | null;
    players: IAdminPlayer[];
}

export const AbilityModal = ({ isOpen, onClose, onSave, ability, players }: AbilityModalProps) => {
    const [playerId, setPlayerId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [abilityType, setAbilityType] = useState<'reveal_info' | 'add_influence' | 'transfer_influence'>(
        'reveal_info',
    );
    const [cooldownMinutes, setCooldownMinutes] = useState('');
    const [startDelayMinutes, setStartDelayMinutes] = useState('');
    const [requiredInfluencePoints, setRequiredInfluencePoints] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(true);
    const [influencePointsToAdd, setInfluencePointsToAdd] = useState('');
    const [influencePointsToRemove, setInfluencePointsToRemove] = useState('');
    const [influencePointsToSelf, setInfluencePointsToSelf] = useState('');

    useEffect(() => {
        if (ability) {
            setPlayerId(ability.playerId.toString());
            setName(ability.name);
            setDescription(ability.description);
            setAbilityType(ability.abilityType);
            setCooldownMinutes(ability.cooldownMinutes?.toString() || '');
            setStartDelayMinutes(ability.startDelayMinutes?.toString() || '');
            setRequiredInfluencePoints(ability.requiredInfluencePoints?.toString() || '');
            setIsUnlocked(ability.isUnlocked);
            setInfluencePointsToAdd(ability.influencePointsToAdd?.toString() || '');
            setInfluencePointsToRemove(ability.influencePointsToRemove?.toString() || '');
            setInfluencePointsToSelf(ability.influencePointsToSelf?.toString() || '');
        } else {
            setPlayerId('');
            setName('');
            setDescription('');
            setAbilityType('reveal_info');
            setCooldownMinutes('');
            setStartDelayMinutes('');
            setRequiredInfluencePoints('');
            setIsUnlocked(true);
            setInfluencePointsToAdd('');
            setInfluencePointsToRemove('');
            setInfluencePointsToSelf('');
        }
    }, [ability, isOpen]);

    const handleSubmit = () => {
        if (!playerId || !name || !abilityType) return;

        onSave({
            player_id: parseInt(playerId),
            name,
            description: description || undefined,
            ability_type: abilityType,
            cooldown_minutes: cooldownMinutes ? parseInt(cooldownMinutes) : undefined,
            start_delay_minutes: startDelayMinutes ? parseInt(startDelayMinutes) : undefined,
            required_influence_points: requiredInfluencePoints
                ? parseInt(requiredInfluencePoints)
                : undefined,
            is_unlocked: isUnlocked,
            influence_points_to_add: influencePointsToAdd ? parseInt(influencePointsToAdd) : undefined,
            influence_points_to_remove: influencePointsToRemove
                ? parseInt(influencePointsToRemove)
                : undefined,
            influence_points_to_self: influencePointsToSelf
                ? parseInt(influencePointsToSelf)
                : undefined,
        });
        handleClose();
    };

    const handleClose = () => {
        setPlayerId('');
        setName('');
        setDescription('');
        setAbilityType('reveal_info');
        setCooldownMinutes('');
        setStartDelayMinutes('');
        setRequiredInfluencePoints('');
        setIsUnlocked(true);
        setInfluencePointsToAdd('');
        setInfluencePointsToRemove('');
        setInfluencePointsToSelf('');
        onClose();
    };

    const abilityTypes = [
        { value: 'reveal_info', label: 'Раскрытие информации' },
        { value: 'add_influence', label: 'Добавить влияние' },
        { value: 'transfer_influence', label: 'Передать влияние' },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {ability ? 'Редактировать способность' : 'Создать способность'}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500">
                        {ability
                            ? 'Измените параметры способности'
                            : 'Укажите параметры новой способности'}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {!ability && (
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Игрок *
                            </Label>
                            <Select value={playerId} onValueChange={setPlayerId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите игрока" />
                                </SelectTrigger>
                                <SelectContent>
                                    {players.map((p) => (
                                        <SelectItem key={p.id} value={p.id.toString()}>
                                            {p.characterName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Название способности *
                        </Label>
                        <Input
                            placeholder="Введите название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Описание</Label>
                        <Textarea
                            placeholder="Введите описание способности"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Тип способности *</Label>
                        <Select
                            value={abilityType}
                            onValueChange={(v: any) => setAbilityType(v)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {abilityTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">
                                Откат (минуты)
                            </Label>
                            <Input
                                type="number"
                                placeholder="60"
                                value={cooldownMinutes}
                                onChange={(e) => setCooldownMinutes(e.target.value)}
                                min="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">
                                Задержка старта (минуты)
                            </Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={startDelayMinutes}
                                onChange={(e) => setStartDelayMinutes(e.target.value)}
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">
                            Требуемые очки влияния
                        </Label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={requiredInfluencePoints}
                            onChange={(e) => setRequiredInfluencePoints(e.target.value)}
                            min="0"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">
                                Очки влияния (добавить)
                            </Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={influencePointsToAdd}
                                onChange={(e) => setInfluencePointsToAdd(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">
                                Очки влияния (убрать)
                            </Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={influencePointsToRemove}
                                onChange={(e) => setInfluencePointsToRemove(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">
                                Очки влияния (себе)
                            </Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={influencePointsToSelf}
                                onChange={(e) => setInfluencePointsToSelf(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isUnlocked"
                            checked={isUnlocked}
                            onCheckedChange={(checked) => setIsUnlocked(checked as boolean)}
                        />
                        <Label
                            htmlFor="isUnlocked"
                            className="text-sm font-medium text-slate-700 cursor-pointer"
                        >
                            Разблокирована
                        </Label>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!name || !abilityType || (!ability && !playerId)}
                    >
                        {ability ? 'Сохранить' : 'Создать способность'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
