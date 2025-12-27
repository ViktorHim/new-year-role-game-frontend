export interface ITransferMoneyPayload {
    amount: number;
    to_player_id: number;
}

export interface ITransferMoneyResponse {
    amount: number;
    message: string;
    new_balance: number;
    to_player_id: number;
}

export interface ITransferItemPayload {
    item_id: number;
    to_player_id: number;
}

export interface ITransferItemResponse {
    item_id: 1;
    message: string;
    to_player_id: 7;
}
