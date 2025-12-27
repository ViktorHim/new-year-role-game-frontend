export interface IBalance {
    money: number;
    influence: number;
}

export interface ITransfer {
    player_id: number;
    money: number;
}

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
