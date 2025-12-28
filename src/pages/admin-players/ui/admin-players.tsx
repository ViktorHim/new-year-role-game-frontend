import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useEffect, useState } from 'react';
import { Edit, UserPlus, Trash2, Loader2 } from 'lucide-react';
import { CreatePlayerModal } from './create-player-modal';
import { EditPlayerPage } from './edit-player-page';
import { useAppStore } from '@/app/store';

export const AdminPlayers = () => {
    const {
        players,
        factions,
        isLoadingPlayers,
        getPlayers,
        getFactions,
        createPlayer,
        deletePlayer,
    } = useAppStore((state) => state.admin);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);

    useEffect(() => {
        getPlayers();
        getFactions();
    }, [getPlayers, getFactions]);

    const handleCreatePlayer = async (data: {
        name: string;
        faction_id?: number;
        role?: string;
    }) => {
        await createPlayer(data);
        setIsCreateModalOpen(false);
    };

    const handleDeletePlayer = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить этого игрока?')) {
            await deletePlayer(id);
        }
    };

    const getInitials = (name: string) => {
        return name
            ?.split(' ')
            ?.map((n) => n[0])
            ?.join('')
            ?.toUpperCase();
    };

    const getFactionColor = (factionName: string | null) => {
        if (!factionName) return 'bg-slate-100 text-slate-700';

        const lowerName = factionName.toLowerCase();
        if (lowerName.includes('мафи') || lowerName.includes('mafia')) {
            return 'bg-red-100 text-red-700';
        }
        if (lowerName.includes('дворец') || lowerName.includes('palace')) {
            return 'bg-blue-100 text-blue-700';
        }
        return 'bg-slate-100 text-slate-700';
    };

    if (editingPlayerId !== null) {
        return (
            <EditPlayerPage playerId={editingPlayerId} onBack={() => setEditingPlayerId(null)} />
        );
    }

    return (
        <Page>
            <div className="flex justify-between items-center mb-6">
                <Title tier={1}>Игроки</Title>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2"
                >
                    <UserPlus className="w-4 h-4" />
                    Создать игрока
                </Button>
            </div>

            {isLoadingPlayers ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {players.map((player) => (
                        <Card key={player.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-3">
                                <div className="flex items-start gap-2">
                                    <Avatar className="w-10 h-10 flex-shrink-0">
                                        <AvatarImage src={undefined} />
                                        <AvatarFallback className="text-xs">
                                            {getInitials(player.name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-semibold text-sm text-slate-900 truncate">
                                                {player.name}
                                            </h3>
                                            <span
                                                className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${getFactionColor(player.factionName)}`}
                                            >
                                                {player.factionName || 'Нет'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 truncate">
                                            {player.role || 'Без роли'}
                                        </p>
                                        <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                                            <div>
                                                <span className="text-slate-500">ОВ:</span>{' '}
                                                <span className="font-medium">
                                                    {player.influencePoints}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500">ID:</span>{' '}
                                                <span className="font-medium">{player.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-1 mt-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 h-7 text-xs"
                                        onClick={() => setEditingPlayerId(player.id)}
                                    >
                                        <Edit className="w-3 h-3 mr-1" />
                                        Изменить
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 px-2"
                                        onClick={() => handleDeletePlayer(player.id)}
                                    >
                                        <Trash2 className="w-3 h-3 text-red-600" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <CreatePlayerModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreatePlayer}
                factions={factions}
            />
        </Page>
    );
};
