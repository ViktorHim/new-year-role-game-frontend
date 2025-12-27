import type {
    IInventoryItemResponse,
    IInventoryItem,
    IItemEffectResponse,
    IItemEffect,
} from './types';

export const itemEffectMapper = (effect: IItemEffectResponse): IItemEffect => ({
    id: effect.id,
    description: effect.description,
    effectType: effect.effect_type,
    generatedResource: effect.generated_resource,
    operation: effect.operation,
    value: effect.value,
    periodSeconds: effect.period_seconds,
});

export const inventoryItemMapper = (item: IInventoryItemResponse): IInventoryItem => ({
    id: item.id,
    name: item.name,
    description: item.description,
    acquiredAt: new Date(item.acquired_at),
    effects: item.effects.map(itemEffectMapper),
});

export const inventoryListMapper = (items: IInventoryItemResponse[]): IInventoryItem[] =>
    items.map(inventoryItemMapper);
