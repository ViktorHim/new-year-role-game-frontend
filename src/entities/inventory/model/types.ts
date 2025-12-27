export type EffectType = 'generate_money' | 'generate_influence' | 'boost_stats' | 'special';
export type ResourceType = 'money' | 'influence';
export type OperationType = 'add' | 'multiply';

export interface IItemEffectResponse {
    id: number;
    description: string;
    effect_type: EffectType;
    generated_resource?: ResourceType;
    operation: OperationType;
    value: number;
    period_seconds?: number;
}

export interface IInventoryItemResponse {
    id: number;
    name: string;
    description: string;
    acquired_at: string;
    effects: IItemEffectResponse[];
}

export interface IInventoryResponse {
    items: IInventoryItemResponse[];
}

export interface IItemEffect {
    id: number;
    description: string;
    effectType: EffectType;
    generatedResource?: ResourceType;
    operation: OperationType;
    value: number;
    periodSeconds?: number;
}

export interface IInventoryItem {
    id: number;
    name: string;
    description: string;
    acquiredAt: Date;
    effects: IItemEffect[];
}

export interface ITransferItemRequest {
    to_player_id: number;
    item_id: number;
}

export interface ITransferItemResponse {
    item_id: number;
    message: string;
    to_player_id: number;
}
