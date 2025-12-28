import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Loader2, Zap, Clock } from 'lucide-react';
import { useAppStore } from '@/app/store';
import type { IAdminAbility } from '@/entities/admin';
import { AbilityModal } from '../modals/ability-modal';

export const AbilitiesTab = () => {
    const { abilities, players, getAbilities, getPlayers, createAbility, updateAbility, deleteAbility } =
        useAppStore((state) => state.admin);

    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAbility, setEditingAbility] = useState<IAdminAbility | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [abilityToDelete, setAbilityToDelete] = useState<number | null>(null);

    useEffect(() => {
        getAbilities();
        getPlayers();
    }, [getAbilities, getPlayers]);

    const handleCreate = () => {
        setEditingAbility(null);
        setIsModalOpen(true);
    };

    const handleEdit = (ability: IAdminAbility) => {
        setEditingAbility(ability);
        setIsModalOpen(true);
    };

    const handleSave = async (data: {
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
    }) => {
        if (editingAbility) {
            await updateAbility(editingAbility.id, {
                name: data.name,
                description: data.description,
                cooldown_minutes: data.cooldown_minutes,
            });
        } else {
            await createAbility(data);
        }
        setIsModalOpen(false);
        setEditingAbility(null);
    };

    const handleDelete = (id: number) => {
        setAbilityToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (abilityToDelete !== null) {
            deleteAbility(abilityToDelete);
        }
        setDeleteConfirmOpen(false);
        setAbilityToDelete(null);
    };

    const getAbilityTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            reveal_info: 'Раскрытие',
            add_influence: 'Добавить влияние',
            transfer_influence: 'Передать влияние',
        };
        return labels[type] || type;
    };

    const getAbilityTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            reveal_info: 'bg-blue-100 text-blue-700',
            add_influence: 'bg-green-100 text-green-700',
            transfer_influence: 'bg-purple-100 text-purple-700',
        };
        return colors[type] || 'bg-slate-100 text-slate-700';
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-slate-600">
                    Всего способностей:{' '}
                    <span className="font-semibold text-slate-900">{abilities.length}</span>
                </div>
                <Button onClick={handleCreate} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Создать способность
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {abilities.map((ability) => (
                        <Card key={ability.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <Badge className={getAbilityTypeColor(ability.abilityType)}>
                                        {getAbilityTypeLabel(ability.abilityType)}
                                    </Badge>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0"
                                            onClick={() => handleEdit(ability)}
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0 hover:bg-red-50"
                                            onClick={() => handleDelete(ability.id)}
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                        </Button>
                                    </div>
                                </div>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    {ability.name}
                                </CardTitle>
                                <CardDescription className="text-xs mt-1">
                                    {ability.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <Clock className="w-3.5 h-3.5" />
                                    Откат: {ability.cooldownMinutes} мин
                                </div>
                                <div className="text-xs text-slate-500">ID: {ability.id}</div>
                            </CardContent>
                        </Card>
                    ))}

                    {abilities.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            <Zap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Способности еще не созданы</p>
                        </div>
                    )}
                </div>
            )}

            <AbilityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                ability={editingAbility}
                players={players}
            />

            <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Удалить способность?</DialogTitle>
                        <DialogDescription>
                            Это действие нельзя будет отменить. Способность будет удалена безвозвратно.
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
