import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { Checkbox } from '@/shared/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { useState, useEffect } from 'react';
import { ArrowLeft, User, Shield, Briefcase, Coins, TrendingUp, Lock, FileText, Image } from 'lucide-react';
import { useAppStore } from '@/app/store';

interface EditPlayerPageProps {
    playerId: number;
    onBack: () => void;
}

export const EditPlayerPage = ({ playerId, onBack }: EditPlayerPageProps) => {
    const { players, factions, updatePlayer } = useAppStore((state) => state.admin);

    const player = players.find((p) => p.id === playerId);

    const [characterName, setCharacterName] = useState('');
    const [password, setPassword] = useState('');
    const [characterStory, setCharacterStory] = useState('');
    const [factionId, setFactionId] = useState('');
    const [role, setRole] = useState('');
    const [influence, setInfluence] = useState('0');
    const [balance, setBalance] = useState('0');
    const [canChangeFaction, setCanChangeFaction] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    useEffect(() => {
        if (player) {
            setCharacterName(player.characterName);
            setPassword('');
            setCharacterStory(player.characterStory || '');
            setFactionId(player.factionId ? player.factionId.toString() : 'none');
            setRole(player.role || '');
            setInfluence(player.influence.toString());
            setBalance(player.money.toString());
            setCanChangeFaction(false);
            setAvatar('');
        }
    }, [player]);

    const handleSave = async () => {
        if (!player || !characterName || !role) return;

        const updateData: any = {
            character_name: characterName,
            character_story: characterStory || undefined,
            role,
            money: parseInt(balance),
            influence: parseInt(influence),
            faction_id: factionId && factionId !== 'none' ? parseInt(factionId) : undefined,
            can_change_faction: canChangeFaction,
            avatar: avatar || undefined,
        };

        // Только если пароль заполнен, добавляем его
        if (password) {
            updateData.password = password;
        }

        await updatePlayer(playerId, updateData);
        setShowSuccessDialog(true);
    };

    if (!player) {
        return (
            <Page>
                <div className="text-center py-12">
                    <p className="text-slate-500">Игрок не найден</p>
                    <Button onClick={onBack} className="mt-4">
                        Вернуться к списку
                    </Button>
                </div>
            </Page>
        );
    }

    return (
        <Page>
            <div className="mb-6">
                <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                    Назад к списку
                </Button>
                <div className="flex items-start justify-between gap-4">
                    <Title tier={1}>Редактирование игрока #{playerId}</Title>
                    <Button
                        onClick={handleSave}
                        className="flex items-center gap-2 flex-shrink-0"
                        disabled={!characterName || !role}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Основная информация</CardTitle>
                        <CardDescription>Базовые данные игрока</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Имя персонажа *
                                    </Label>
                                    <Input
                                        value={characterName}
                                        onChange={(e) => setCharacterName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        Пароль
                                    </Label>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Оставьте пустым, если не хотите менять"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    История персонажа
                                </Label>
                                <Textarea
                                    value={characterStory}
                                    onChange={(e) => setCharacterStory(e.target.value)}
                                    rows={3}
                                    placeholder="История персонажа"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        Роль *
                                    </Label>
                                    <Input value={role} onChange={(e) => setRole(e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        Фракция
                                    </Label>
                                    <Select value={factionId} onValueChange={setFactionId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Без фракции" />
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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Coins className="w-4 h-4" />
                                        Деньги
                                    </Label>
                                    <Input
                                        type="number"
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        Очки влияния (ОВ)
                                    </Label>
                                    <Input
                                        type="number"
                                        value={influence}
                                        onChange={(e) => setInfluence(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="canChangeFaction"
                                    checked={canChangeFaction}
                                    onCheckedChange={(checked) => setCanChangeFaction(checked as boolean)}
                                />
                                <Label htmlFor="canChangeFaction" className="cursor-pointer">
                                    Может менять фракцию
                                </Label>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Image className="w-4 h-4" />
                                    Аватар (URL)
                                </Label>
                                <Input
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    placeholder="https://example.com/avatar.png"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Успешно сохранено</DialogTitle>
                        <DialogDescription>
                            Данные игрока успешно обновлены
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setShowSuccessDialog(false)}>
                            OK
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Page>
    );
};
