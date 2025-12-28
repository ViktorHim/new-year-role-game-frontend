import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Loader2, Shield, Users } from 'lucide-react';
import { useAppStore } from '@/app/store';
import { FactionModal } from '../modals/faction-modal';
import type { IAdminFaction } from '@/entities/admin';

export const FactionsTab = () => {
    const {
        factions,
        players,
        isLoadingFactions,
        getFactions,
        getPlayers,
        createFaction,
        updateFaction,
        deleteFaction,
    } = useAppStore((state) => state.admin);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingFaction, setEditingFaction] = useState<IAdminFaction | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [factionToDelete, setFactionToDelete] = useState<{ id: number; playerCount: number } | null>(null);

    useEffect(() => {
        getFactions();
        getPlayers();
    }, [getFactions, getPlayers]);

    const handleCreateFaction = async (data: { name: string; description: string }) => {
        await createFaction(data);
        setIsCreateModalOpen(false);
    };

    const handleUpdateFaction = async (data: { name: string; description: string }) => {
        if (editingFaction) {
            await updateFaction(editingFaction.id, data);
            setEditingFaction(null);
        }
    };

    const handleDeleteFaction = (id: number) => {
        const playersInFaction = players.filter((p) => p.factionId === id);
        setFactionToDelete({ id, playerCount: playersInFaction.length });
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (factionToDelete !== null) {
            await deleteFaction(factionToDelete.id);
        }
        setDeleteConfirmOpen(false);
        setFactionToDelete(null);
    };

    const getPlayerCountInFaction = (factionId: number) => {
        return players.filter((p) => p.factionId === factionId).length;
    };

    const getFactionColor = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('мафи') || lowerName.includes('mafia')) {
            return 'bg-red-50 border-red-200';
        }
        if (lowerName.includes('дворец') || lowerName.includes('palace')) {
            return 'bg-blue-50 border-blue-200';
        }
        return 'bg-slate-50 border-slate-200';
    };

    const getFactionIconColor = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('мафи') || lowerName.includes('mafia')) {
            return 'text-red-600';
        }
        if (lowerName.includes('дворец') || lowerName.includes('palace')) {
            return 'text-blue-600';
        }
        return 'text-slate-600';
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-slate-600">
                    Всего фракций: <span className="font-semibold text-slate-900">{factions.length}</span>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Создать фракцию
                </Button>
            </div>

            {isLoadingFactions ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {factions.map((faction) => (
                        <Card
                            key={faction.id}
                            className={`hover:shadow-md transition-shadow border-2 ${getFactionColor(faction.name)}`}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <Shield className={`w-5 h-5 ${getFactionIconColor(faction.name)}`} />
                                        <CardTitle className="text-lg">{faction.name}</CardTitle>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0"
                                            onClick={() => setEditingFaction(faction)}
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0 hover:bg-red-50"
                                            onClick={() => handleDeleteFaction(faction.id)}
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                        </Button>
                                    </div>
                                </div>
                                <CardDescription className="text-xs mt-1">
                                    {faction.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Users className="w-4 h-4" />
                                    <span>
                                        {getPlayerCountInFaction(faction.id)} игрок(ов)
                                    </span>
                                </div>
                                <div className="mt-2 text-xs text-slate-500">
                                    ID: {faction.id}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {factions.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Фракции еще не созданы</p>
                            <p className="text-sm mt-1">Создайте первую фракцию для начала</p>
                        </div>
                    )}
                </div>
            )}

            <FactionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateFaction}
                title="Создать фракцию"
            />

            <FactionModal
                isOpen={editingFaction !== null}
                onClose={() => setEditingFaction(null)}
                onSubmit={handleUpdateFaction}
                title="Редактировать фракцию"
                initialData={
                    editingFaction
                        ? { name: editingFaction.name, description: editingFaction.description }
                        : undefined
                }
            />

            <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Удалить фракцию?</DialogTitle>
                        <DialogDescription>
                            {factionToDelete && factionToDelete.playerCount > 0 ? (
                                <>
                                    В этой фракции {factionToDelete.playerCount} игрок(ов).
                                    <br />
                                    При удалении они останутся без фракции. Продолжить?
                                </>
                            ) : (
                                'Вы уверены, что хотите удалить эту фракцию? Это действие нельзя будет отменить.'
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                            Отмена
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Удалить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
