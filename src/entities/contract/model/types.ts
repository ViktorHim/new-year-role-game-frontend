export type ContractType = 'type1' | 'type2';
export type ContractStatus = 'pending' | 'signed' | 'completed' | 'terminated';

export interface IContractResponse {
    id: number;
    contract_type: ContractType;
    customer_player_id: number;
    customer_player_name: string;
    customer_player_avatar: string | null;
    executor_player_id: number;
    executor_player_name: string;
    executor_player_avatar: string | null;
    customer_faction_id: number;
    customer_faction_name: string;
    status: ContractStatus;
    duration_seconds: number;
    money_reward_customer: number;
    money_reward_executor: number;
    created_at: string;
    is_customer: boolean;
    is_executor: boolean;
    can_sign: boolean;
    can_complete: boolean;
    info_revealed?: boolean;
}

export interface IContractsResponse {
    contracts: IContractResponse[];
}

interface IBaseContract {
    id: number;
    contractType: ContractType;
    status: ContractStatus;
    durationSeconds: number;
    createdAt: Date;
    canSign: boolean;
    canComplete: boolean;
}

export interface IReceivedContract extends IBaseContract {
    executorPlayerId: number;
    executorPlayerName: string;
    executorPlayerAvatar: string | null;
    moneyReward: number; // money_reward_customer
    isCustomer: true;
}

export interface IMyContract extends IBaseContract {
    customerPlayerId: number;
    customerPlayerName: string;
    customerPlayerAvatar: string | null;
    customerFactionId: number;
    customerFactionName: string;
    moneyReward: number; // money_reward_executor
    isExecutor: true;
}

export type IContract = IMyContract | IReceivedContract;

export interface ICreateContractRequest {
    contract_type: ContractType;
    customer_player_id: number;
    duration_seconds: number;
}

export type RevealInfoType = 'faction' | 'goal' | 'item';

export interface IRevealContractRequest {
    info_category: RevealInfoType;
}

export interface IRevealedFaction {
    faction_id: number | null;
    faction_name: string;
}

export interface IRevealedGoal {
    goal_description: string;
    goal_id: number;
    goal_title: string;
}

export interface IRevealedItem {
    item_description: string;
    item_id: number;
    item_name: string;
}

export interface IRevealContractResponse {
    message: string;
    revealed_info: {
        info_type: RevealInfoType;
        data: IRevealedFaction | IRevealedGoal | IRevealedItem;
    };
}

export interface ICreateContractResponse {
    id: number;
    message: string;
}
