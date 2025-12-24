import { Page } from '@/shared/ui';
import { Button } from '@/shared/ui/button';
import { ProfileForm } from './profile-form';
import { useState } from 'react';
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@radix-ui/react-select';
import { Package, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { UniqueAbilities } from './unique-abilities';
import { PersonalGoals } from './personal-goals';
import { TeamGoals } from './team-goals';
import { ItemCard } from './item-card';

const mockPlayerData = {
    avatar: '👤',
    name: 'Виктор Романов',
    money: 5000,
    influence: 250,
    faction: 'neutral', // 'neutral', 'mafia', 'police', etc.
    abilities: [
        'Деловые связи: Один раз за игру можете получить информацию о финансовых операциях любого игрока',
        'Влиятельность: Ваш голос считается за два голоса при принятии коллективных решений',
        'Защита репутации: Один раз за игру можете отменить любое обвинение, направленное против вас',
    ],
    factionGoals: [],
    personalGoals: [
        {
            id: 1,
            description: 'Заключить выгодную сделку с представителем мафии',
            completed: false,
        },
        { id: 2, description: 'Узнать настоящую личность главы полиции', completed: false },
        { id: 3, description: 'Накопить 10000 денег', completed: false },
        { id: 4, description: 'Получить 500 очков влияния', completed: true },
    ],
    items: [
        {
            id: 1,
            name: 'Компромат на чиновника',
            description:
                'Документы, содержащие доказательства коррупционных схем высокопоставленного чиновника. Могут быть использованы для шантажа или переданы в полицию.',
        },
        {
            id: 2,
            name: 'Ключ от сейфа',
            description:
                'Старинный ключ, найденный в подвале ресторана. Неизвестно, к какому сейфу он подходит, но явно представляет ценность.',
        },
        {
            id: 3,
            name: 'Телефон с записями',
            description:
                'Зашифрованный телефон с аудиозаписями переговоров. Содержимое может изменить расклад сил в городе.',
        },
    ],
};

const mockPlayers = [
    { id: 1, name: 'Александра Петрова' },
    { id: 2, name: 'Дмитрий Волков' },
    { id: 3, name: 'Елена Соколова' },
    { id: 4, name: 'Игорь Морозов' },
    { id: 5, name: 'Мария Кузнецова' },
];

export const CharacterPage = () => {
    const [showMoneyTransfer, setShowMoneyTransfer] = useState(false);
    const [transferAmount, setTransferAmount] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [transferError, setTransferError] = useState('');

    const [showItemTransfer, setShowItemTransfer] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemRecipient, setItemRecipient] = useState('');

    const [showItemDetails, setShowItemDetails] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [personalGoals, setPersonalGoals] = useState(mockPlayerData.personalGoals);

    const toggleGoal = (goalId) => {
        setPersonalGoals((prev) =>
            prev.map((goal) =>
                goal.id === goalId ? { ...goal, completed: !goal.completed } : goal,
            ),
        );
    };

    console.log(showMoneyTransfer);

    const handleMoneyTransfer = () => {
        const amount = parseInt(transferAmount);
        if (!selectedPlayer) {
            setTransferError('Выберите получателя');
            return;
        }
        if (!amount || amount <= 0) {
            setTransferError('Введите корректную сумму');
            return;
        }
        if (amount > mockPlayerData.money) {
            setTransferError(`Недостаточно средств. Доступно: ${mockPlayerData.money}`);
            return;
        }

        // Здесь логика отправки
        console.log(`Перевод ${amount} игроку ${selectedPlayer}`);
        setShowMoneyTransfer(false);
        setTransferAmount('');
        setSelectedPlayer('');
        setTransferError('');
    };

    const handleItemClick = (item) => {
        setCurrentItem(item);
        setShowItemDetails(true);
    };

    const handleItemTransferStart = () => {
        setSelectedItem(currentItem);
        setShowItemDetails(false);
        setShowItemTransfer(true);
    };

    const handleItemTransfer = () => {
        if (!itemRecipient) return;

        // Здесь логика передачи предмета
        setShowItemTransfer(false);
        setSelectedItem(null);
        setItemRecipient('');
    };

    return (
        <Page>
            <ProfileForm
                money={mockPlayerData.money}
                influence={mockPlayerData.influence}
                onMoneyClick={() => setShowMoneyTransfer(true)}
                fraction="без фракции"
            />
            <UniqueAbilities abilities={mockPlayerData.abilities} />
            <PersonalGoals goals={personalGoals} toggleGoal={toggleGoal} />
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 mb-3">Предметы</h2>
                <div className="space-y-3">
                    {mockPlayerData.items.map((item) => (
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            onClick={handleItemClick}
                        />
                    ))}
                </div>
            </div>
            {/* Диалог перевода денег */}
            <Dialog open={showMoneyTransfer} onOpenChange={setShowMoneyTransfer}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Перевести деньги</DialogTitle>
                        <DialogDescription className="sr-only">
                            Форма перевода денег
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">
                                Получатель
                            </label>
                            <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите игрока" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mockPlayers.map((player) => (
                                        <SelectItem key={player.id} value={player.name}>
                                            {player.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">
                                Сумма (доступно: {mockPlayerData.money})
                            </label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={transferAmount}
                                onChange={(e) => {
                                    setTransferError('');
                                    setTransferAmount(e.target.value);
                                }}
                                max={mockPlayerData.money}
                                min="1"
                            />
                        </div>

                        {transferError && (
                            <Alert variant="destructive">
                                <AlertDescription>{transferError}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowMoneyTransfer(false);
                                setTransferError('');
                            }}
                        >
                            Отмена
                        </Button>
                        <Button onClick={handleMoneyTransfer}>
                            <Send className="w-4 h-4 mr-2" />
                            Перевести
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Диалог с деталями предмета */}
            <Dialog open={showItemDetails} onOpenChange={setShowItemDetails}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{currentItem?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-slate-700 leading-relaxed">{currentItem?.description}</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowItemDetails(false)}>
                            Закрыть
                        </Button>
                        <Button onClick={handleItemTransferStart}>
                            <Send className="w-4 h-4 mr-2" />
                            Передать предмет...
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Диалог передачи предмета */}
            <Dialog open={showItemTransfer} onOpenChange={setShowItemTransfer}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Выбрать получателя</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="bg-slate-50 rounded-lg p-3">
                            <p className="text-sm text-slate-600 mb-1">Предмет:</p>
                            <p className="font-semibold text-slate-800">{selectedItem?.name}</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">
                                Получатель
                            </label>
                            <Select value={itemRecipient} onValueChange={setItemRecipient}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите игрока" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mockPlayers.map((player) => (
                                        <SelectItem key={player.id} value={player.name}>
                                            {player.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowItemTransfer(false);
                                setItemRecipient('');
                            }}
                        >
                            Отмена
                        </Button>
                        <Button onClick={handleItemTransfer} disabled={!itemRecipient}>
                            ОК
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Page>
    );
};
