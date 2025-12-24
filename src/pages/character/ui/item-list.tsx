import { ItemCard } from './item-card';
import { Button } from '@/shared/ui/button';
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';
import { Send } from 'lucide-react';

const items = [
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
];

export const ItemList = () => {
    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 mb-3">Предметы</h2>
                <div className="space-y-3">
                    {items.map((item) => (
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
                            Передать предмет
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
        </>
    );
};
