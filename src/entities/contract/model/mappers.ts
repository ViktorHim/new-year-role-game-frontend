import type { IContractResponse, IMyContract, IReceivedContract } from './types';

export const contractMapper = (contract: IContractResponse): IMyContract | IReceivedContract => {
    const baseContract = {
        id: contract.id,
        contractType: contract.contract_type,
        status: contract.status,
        durationSeconds: contract.duration_seconds,
        createdAt: new Date(contract.created_at),
        canSign: contract.can_sign,
        canComplete: contract.can_complete,
    };

    if (contract.is_customer) {
        return {
            ...baseContract,
            executorPlayerId: contract.executor_player_id,
            executorPlayerName: contract.executor_player_name,
            executorPlayerAvatar: contract.executor_player_avatar,
            moneyReward: contract.money_reward_customer,
            isCustomer: true as const,
        };
    }

    return {
        ...baseContract,
        customerPlayerId: contract.customer_player_id,
        customerPlayerName: contract.customer_player_name,
        customerPlayerAvatar: contract.customer_player_avatar,
        customerFactionId: contract.customer_faction_id,
        customerFactionName: contract.customer_faction_name,
        moneyReward: contract.money_reward_executor,
        isExecutor: true as const,
    };
};

export const contractsListMapper = (contracts: IContractResponse[]) =>
    contracts.map(contractMapper);
