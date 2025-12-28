import { useState } from 'react';
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
import { Checkbox } from '@/shared/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { User, Shield, Briefcase, DollarSign, Zap, Image, Lock, FileText } from 'lucide-react';
import type { IAdminFaction } from '@/entities/admin';

interface CreatePlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: {
        character_name: string;
        password: string;
        character_story?: string;
        role: string;
        money?: number;
        influence?: number;
        faction_id?: number;
        can_change_faction?: boolean;
        avatar?: string;
    }) => void;
    factions: IAdminFaction[];
}

export const CreatePlayerModal = ({ isOpen, onClose, onCreate, factions }: CreatePlayerModalProps) => {
    const [characterName, setCharacterName] = useState('');
    const [password, setPassword] = useState('');
    const [characterStory, setCharacterStory] = useState('');
    const [role, setRole] = useState('');
    const [money, setMoney] = useState('0');
    const [influence, setInfluence] = useState('0');
    const [factionId, setFactionId] = useState<string>('');
    const [canChangeFaction, setCanChangeFaction] = useState(false);
    const [avatar, setAvatar] = useState('');

    const handleSubmit = () => {
        if (characterName && password && role) {
            onCreate({
                character_name: characterName,
                password,
                character_story: characterStory || undefined,
                role,
                money: money ? parseInt(money) : undefined,
                influence: influence ? parseInt(influence) : undefined,
                faction_id: factionId && factionId !== 'none' ? parseInt(factionId) : undefined,
                can_change_faction: canChangeFaction,
                avatar: avatar || undefined,
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setCharacterName('');
        setPassword('');
        setCharacterStory('');
        setRole('');
        setMoney('0');
        setInfluence('0');
        setFactionId('');
        setCanChangeFaction(false);
        setAvatar('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Создать игрока</DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Укажите базовые настройки нового игрока
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Имя персонажа *
                        </Label>
                        <Input
                            placeholder="Введите имя персонажа"
                            value={characterName}
                            onChange={(e) => setCharacterName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Пароль *
                        </Label>
                        <Input
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            История персонажа
                        </Label>
                        <Textarea
                            placeholder="Введите историю персонажа"
                            value={characterStory}
                            onChange={(e) => setCharacterStory(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Роль *
                        </Label>
                        <Input
                            placeholder="Введите роль"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Деньги
                            </Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={money}
                                onChange={(e) => setMoney(e.target.value)}
                                min="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Влияние
                            </Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={influence}
                                onChange={(e) => setInfluence(e.target.value)}
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Фракция
                        </Label>
                        <Select value={factionId} onValueChange={setFactionId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите фракцию" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Без фракции</SelectItem>
                                {factions.map((f) => (
                                    <SelectItem key={f.id} value={f.id.toString()}>
                                        {f.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="canChangeFaction"
                            checked={canChangeFaction}
                            onCheckedChange={(checked) => setCanChangeFaction(checked as boolean)}
                        />
                        <Label
                            htmlFor="canChangeFaction"
                            className="text-sm font-medium text-slate-700 cursor-pointer"
                        >
                            Может менять фракцию
                        </Label>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Image className="w-4 h-4" />
                            Аватар (URL)
                        </Label>
                        <Input
                            placeholder="https://example.com/avatar.png"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
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
                        disabled={!characterName || !password || !role}
                    >
                        Создать игрока
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
