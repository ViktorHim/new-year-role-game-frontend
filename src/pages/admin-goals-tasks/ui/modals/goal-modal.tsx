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
import { Target, FileText, Award } from 'lucide-react';
import type { IAdminPlayer, IAdminFaction } from '@/entities/admin';

interface GoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    title: string;
    players: IAdminPlayer[];
    factions: IAdminFaction[];
    initialData?: {
        title: string;
        description: string;
        goal_type: 'personal' | 'faction';
        faction_id?: number;
        player_id?: number;
        influence_points_reward: number;
    };
    isEdit?: boolean;
}

export const GoalModal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    players,
    factions,
    initialData,
    isEdit,
}: GoalModalProps) => {
    const [goalTitle, setGoalTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goalType, setGoalType] = useState<'personal' | 'faction'>('personal');
    const [factionId, setFactionId] = useState<string>('');
    const [playerId, setPlayerId] = useState<string>('');
    const [influenceReward, setInfluenceReward] = useState('100');

    useEffect(() => {
        if (initialData) {
            setGoalTitle(initialData.title);
            setDescription(initialData.description);
            setGoalType(initialData.goal_type);
            setFactionId(initialData.faction_id?.toString() || '');
            setPlayerId(initialData.player_id?.toString() || '');
            setInfluenceReward(initialData.influence_points_reward.toString());
        } else {
            setGoalTitle('');
            setDescription('');
            setGoalType('personal');
            setFactionId('');
            setPlayerId('');
            setInfluenceReward('100');
        }
    }, [initialData, isOpen]);

    const handleSubmit = () => {
        if (!goalTitle || !description || !influenceReward) return;

        const data: any = {
            title: goalTitle,
            description,
            influence_points_reward: parseInt(influenceReward),
        };

        if (!isEdit) {
            data.goal_type = goalType;
            if (goalType === 'faction' && factionId) {
                data.faction_id = parseInt(factionId);
            }
            if (goalType === 'personal' && playerId) {
                data.player_id = parseInt(playerId);
            }
        }

        onSubmit(data);
        handleClose();
    };

    const handleClose = () => {
        setGoalTitle('');
        setDescription('');
        setGoalType('personal');
        setFactionId('');
        setPlayerId('');
        setInfluenceReward('100');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Укажите параметры цели
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Название цели *
                        </Label>
                        <Input
                            placeholder="Например: Собрать 1000 монет"
                            value={goalTitle}
                            onChange={(e) => setGoalTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Описание *
                        </Label>
                        <Textarea
                            placeholder="Опишите цель подробнее..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    {!isEdit && (
                        <>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">
                                    Тип цели *
                                </Label>
                                <Select value={goalType} onValueChange={(v: any) => setGoalType(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Личная (для игрока)</SelectItem>
                                        <SelectItem value="faction">Фракционная</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {goalType === 'personal' && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-slate-700">
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

                            {goalType === 'faction' && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-slate-700">
                                        Фракция *
                                    </Label>
                                    <Select value={factionId} onValueChange={setFactionId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Выберите фракцию" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {factions.map((f) => (
                                                <SelectItem key={f.id} value={f.id.toString()}>
                                                    {f.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </>
                    )}

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Награда (Очки влияния) *
                        </Label>
                        <Input
                            type="number"
                            min="0"
                            placeholder="100"
                            value={influenceReward}
                            onChange={(e) => setInfluenceReward(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={
                            !goalTitle ||
                            !description ||
                            !influenceReward ||
                            (!isEdit &&
                                ((goalType === 'personal' && !playerId) ||
                                    (goalType === 'faction' && !factionId)))
                        }
                    >
                        {isEdit ? 'Сохранить' : 'Создать'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
