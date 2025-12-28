import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
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
import { Plus, Edit, Trash2, Loader2, Package } from 'lucide-react';
import { useAppStore } from '@/app/store';
import type { IAdminItem } from '@/entities/admin';
import { ItemModal } from '../modals/item-modal';

export const ItemsTab = () => {
    const { items, isLoadingItems, getItems, createItem, updateItem, deleteItem } = useAppStore(
        (state) => state.admin,
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IAdminItem | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    useEffect(() => {
        getItems();
    }, [getItems]);

    const handleCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: IAdminItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSave = async (data: { name: string; description: string }) => {
        if (editingItem) {
            await updateItem(editingItem.id, data);
        } else {
            await createItem(data);
        }
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = (id: number) => {
        setItemToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete !== null) {
            deleteItem(itemToDelete);
        }
        setDeleteConfirmOpen(false);
        setItemToDelete(null);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-slate-600">
                    Всего предметов: <span className="font-semibold text-slate-900">{items.length}</span>
                </div>
                <Button onClick={handleCreate} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Создать предмет
                </Button>
            </div>

            {isLoadingItems ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        {item.name}
                                    </CardTitle>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0 hover:bg-red-50"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                        </Button>
                                    </div>
                                </div>
                                <CardDescription className="text-xs mt-1">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-slate-500">ID: {item.id}</div>
                            </CardContent>
                        </Card>
                    ))}

                    {items.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Предметы еще не созданы</p>
                        </div>
                    )}
                </div>
            )}

            <ItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                item={editingItem}
            />

            <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Удалить предмет?</DialogTitle>
                        <DialogDescription>
                            Это действие нельзя будет отменить. Предмет будет удален безвозвратно.
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
