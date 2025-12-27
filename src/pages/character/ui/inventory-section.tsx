import {
    type IInventoryItem,
    InventoryList,
    InventoryItemModal,
    TransferItemModal,
} from '@/entities/inventory';
import { useInventory } from '@/entities/inventory/store';
import { Title } from '@/shared/ui/title';
import { useState, useEffect } from 'react';

export const InventorySection = () => {
    const { items, isLoading, getInventory, transferItem } = useInventory();
    const [selectedItem, setSelectedItem] = useState<IInventoryItem | null>(null);
    const [transferItem_State, setTransferItem_State] = useState<IInventoryItem | null>(null);

    useEffect(() => {
        getInventory();
    }, [getInventory]);

    const handleOpenDetails = (item: IInventoryItem) => {
        setSelectedItem(item);
    };
    const handleOpenTransferModal = (item: IInventoryItem) => {
        setTransferItem_State(item);
    };

    const handleCloseTransferModal = () => {
        setTransferItem_State(null);
    };
    const handleTransfer = async (itemId: number, toPlayerId: number) => {
        await transferItem({
            item_id: itemId,
            to_player_id: toPlayerId,
        });
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    if (isLoading && items.length === 0) {
        return <div>Загрузка инвентаря...</div>;
    }
    return (
        <>
            <Title tier={2} classname="mb-3">
                Инвентарь
            </Title>
            <InventoryList items={items} onOpenDetails={handleOpenDetails} />

            <InventoryItemModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={handleCloseModal}
                onTransfer={handleOpenTransferModal}
            />

            <TransferItemModal
                item={transferItem_State}
                isOpen={!!transferItem_State}
                onClose={handleCloseTransferModal}
                onTransfer={handleTransfer}
                isLoading={isLoading}
            />
        </>
    );
};
