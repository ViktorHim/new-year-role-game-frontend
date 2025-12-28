import type {
    IAdminFaction,
    IAdminFactionResponse,
    IAdminPlayer,
    IAdminPlayerResponse,
    IAdminGoal,
    IAdminGoalResponse,
    IAdminTask,
    IAdminTaskResponse,
    ITaskBlock,
    ITaskBlockResponse,
    IAdminItem,
    IAdminItemResponse,
    IItemEffect,
    IItemEffectResponse,
    IAdminAbility,
    IAdminAbilityResponse,
    IContractSettings,
    IContractSettingsResponse,
    IDebtSettings,
    IDebtSettingsResponse,
    IActiveContract,
    IActiveContractResponse,
    IDebt,
    IDebtResponse,
    IBalanceTransaction,
    IBalanceTransactionResponse,
    IGoalRaceTrigger,
    IGoalRaceTriggerResponse,
    IPredefinedGoal,
    IPredefinedGoalResponse,
    IGoalRaceHistory,
    IGoalRaceHistoryResponse,
    IPlayerInventoryItem,
    IPlayerInventoryItemResponse,
    IGoalDependency,
    IGoalDependencyResponse,
    IPlayerInfo,
    IPlayerInfoResponse,
    ITriggerParticipant,
    ITriggerParticipantResponse,
    IAbilityUsageHistory,
    IAbilityUsageHistoryResponse,
    IRevealedInfo,
    IRevealedInfoResponse,
} from './types';

// ========== FACTIONS ==========
export const factionMapper = (faction: IAdminFactionResponse): IAdminFaction => ({
    id: faction.id,
    name: faction.name,
    description: faction.description,
    createdAt: new Date(faction.created_at),
});

export const factionsMapper = (factions: IAdminFactionResponse[]): IAdminFaction[] =>
    factions.map(factionMapper);

// ========== PLAYERS ==========
export const playerMapper = (player: IAdminPlayerResponse): IAdminPlayer => ({
    id: player.id,
    characterName: player.character_name,
    characterStory: player.character_story,
    factionId: player.faction_id,
    factionName: player.faction_name,
    role: player.role,
    money: player.money,
    influence: player.influence,
    createdAt: new Date(player.created_at),
});

export const playersMapper = (players: IAdminPlayerResponse[]): IAdminPlayer[] =>
    players.map(playerMapper);

// ========== GOALS ==========
export const goalMapper = (goal: IAdminGoalResponse): IAdminGoal => ({
    id: goal.id,
    title: goal.title,
    description: goal.description,
    goalType: goal.goal_type,
    factionId: goal.faction_id,
    factionName: goal.faction_name,
    playerId: goal.player_id,
    playerName: goal.player_name,
    influencePointsReward: goal.influence_points_reward,
    isCompleted: goal.is_completed,
    completedByPlayerId: goal.completed_by_player_id,
    completedByPlayerName: goal.completed_by_player_name,
    completedAt: goal.completed_at ? new Date(goal.completed_at) : null,
    createdAt: new Date(goal.created_at),
});

export const goalsMapper = (goals: IAdminGoalResponse[]): IAdminGoal[] => goals.map(goalMapper);

// ========== TASKS ==========
export const taskMapper = (task: IAdminTaskResponse): IAdminTask => ({
    id: task.id,
    taskBlockId: task.task_block_id,
    taskBlockName: task.task_block_name,
    title: task.title,
    description: task.description,
    taskOrder: task.task_order,
    influencePointsReward: task.influence_points_reward,
    moneyReward: task.money_reward,
    isActive: task.is_active,
    createdAt: new Date(task.created_at),
});

export const tasksMapper = (tasks: IAdminTaskResponse[]): IAdminTask[] => tasks.map(taskMapper);

export const taskBlockMapper = (block: ITaskBlockResponse): ITaskBlock => ({
    id: block.id,
    name: block.name,
    description: block.description,
    createdAt: new Date(block.created_at),
});

export const taskBlocksMapper = (blocks: ITaskBlockResponse[]): ITaskBlock[] =>
    blocks.map(taskBlockMapper);

// ========== ITEMS ==========
export const itemMapper = (item: IAdminItemResponse): IAdminItem => ({
    id: item.id,
    name: item.name,
    description: item.description,
    createdAt: new Date(item.created_at),
});

export const itemsMapper = (items: IAdminItemResponse[]): IAdminItem[] => items.map(itemMapper);

export const itemEffectMapper = (effect: IItemEffectResponse): IItemEffect => ({
    id: effect.id,
    itemId: effect.item_id,
    itemName: effect.item_name,
    effectType: effect.effect_type,
    value: effect.value,
    durationMinutes: effect.duration_minutes,
    description: effect.description,
    createdAt: new Date(effect.created_at),
});

export const itemEffectsMapper = (effects: IItemEffectResponse[]): IItemEffect[] =>
    effects.map(itemEffectMapper);

// ========== ABILITIES ==========
export const abilityMapper = (ability: IAdminAbilityResponse): IAdminAbility => ({
    id: ability.id,
    name: ability.name,
    description: ability.description,
    abilityType: ability.ability_type,
    cooldownMinutes: ability.cooldown_minutes,
    canTargetSelf: ability.can_target_self,
    createdAt: new Date(ability.created_at),
});

export const abilitiesMapper = (abilities: IAdminAbilityResponse[]): IAdminAbility[] =>
    abilities.map(abilityMapper);

// ========== CONTRACT SETTINGS ==========
export const contractSettingsMapper = (
    settings: IContractSettingsResponse,
): IContractSettings => ({
    id: settings.id,
    contractType: settings.contract_type,
    basePrice: settings.base_price,
    minPrice: settings.min_price,
    maxPrice: settings.max_price,
    isEnabled: settings.is_enabled,
});

export const contractSettingsListMapper = (
    settings: IContractSettingsResponse[],
): IContractSettings[] => settings.map(contractSettingsMapper);

// ========== DEBT SETTINGS ==========
export const debtSettingsMapper = (settings: IDebtSettingsResponse): IDebtSettings => ({
    id: settings.id,
    baseDebtAmount: settings.base_debt_amount,
    interestRate: settings.interest_rate,
    maxDebtMultiplier: settings.max_debt_multiplier,
    isEnabled: settings.is_enabled,
});

// ========== MONITORING ==========
export const activeContractMapper = (contract: IActiveContractResponse): IActiveContract => ({
    id: contract.id,
    contractType: contract.contract_type,
    customerPlayerId: contract.customer_player_id,
    customerPlayerName: contract.customer_player_name,
    executorPlayerId: contract.executor_player_id,
    executorPlayerName: contract.executor_player_name,
    status: contract.status,
    price: contract.price,
    createdAt: new Date(contract.created_at),
});

export const activeContractsMapper = (
    contracts: IActiveContractResponse[],
): IActiveContract[] => contracts.map(activeContractMapper);

export const debtMapper = (debt: IDebtResponse): IDebt => ({
    id: debt.id,
    debtorPlayerId: debt.debtor_player_id,
    debtorPlayerName: debt.debtor_player_name,
    currentAmount: debt.current_amount,
    interestRate: debt.interest_rate,
    maxAmount: debt.max_amount,
    lastInterestAppliedAt: debt.last_interest_applied_at
        ? new Date(debt.last_interest_applied_at)
        : null,
    createdAt: new Date(debt.created_at),
});

export const debtsMapper = (debts: IDebtResponse[]): IDebt[] => debts.map(debtMapper);

export const balanceTransactionMapper = (
    transaction: IBalanceTransactionResponse,
): IBalanceTransaction => ({
    id: transaction.id,
    playerId: transaction.player_id,
    playerName: transaction.player_name,
    amount: transaction.amount,
    transactionType: transaction.transaction_type,
    description: transaction.description,
    createdAt: new Date(transaction.created_at),
});

export const balanceTransactionsMapper = (
    transactions: IBalanceTransactionResponse[],
): IBalanceTransaction[] => transactions.map(balanceTransactionMapper);

// ========== GOAL RACE ==========
export const goalRaceTriggerMapper = (trigger: IGoalRaceTriggerResponse): IGoalRaceTrigger => ({
    id: trigger.id,
    name: trigger.name,
    description: trigger.description,
    requiredTasksCount: trigger.required_tasks_count,
    isActive: trigger.is_active,
    createdAt: new Date(trigger.created_at),
});

export const goalRaceTriggersMapper = (
    triggers: IGoalRaceTriggerResponse[],
): IGoalRaceTrigger[] => triggers.map(goalRaceTriggerMapper);

export const predefinedGoalMapper = (goal: IPredefinedGoalResponse): IPredefinedGoal => ({
    id: goal.id,
    triggerId: goal.trigger_id,
    roundNumber: goal.round_number,
    playerId: goal.player_id,
    playerName: goal.player_name,
    title: goal.title,
    description: goal.description,
    influencePointsReward: goal.influence_points_reward,
    createdAt: new Date(goal.created_at),
});

export const predefinedGoalsMapper = (goals: IPredefinedGoalResponse[]): IPredefinedGoal[] =>
    goals.map(predefinedGoalMapper);

export const goalRaceHistoryMapper = (history: IGoalRaceHistoryResponse): IGoalRaceHistory => ({
    id: history.id,
    triggerId: history.trigger_id,
    triggerName: history.trigger_name,
    roundNumber: history.round_number,
    winnerPlayerId: history.winner_player_id,
    winnerPlayerName: history.winner_player_name,
    startedAt: new Date(history.started_at),
    completedAt: history.completed_at ? new Date(history.completed_at) : null,
});

export const goalRaceHistoriesMapper = (
    histories: IGoalRaceHistoryResponse[],
): IGoalRaceHistory[] => histories.map(goalRaceHistoryMapper);

// ========== RELATIONS ==========
export const playerInventoryItemMapper = (
    item: IPlayerInventoryItemResponse,
): IPlayerInventoryItem => ({
    id: item.id,
    itemId: item.item_id,
    itemName: item.item_name,
    description: item.description,
    acquiredAt: new Date(item.acquired_at),
});

export const playerInventoryItemsMapper = (
    items: IPlayerInventoryItemResponse[],
): IPlayerInventoryItem[] => items.map(playerInventoryItemMapper);

export const goalDependencyMapper = (dependency: IGoalDependencyResponse): IGoalDependency => ({
    id: dependency.id,
    goalId: dependency.goal_id,
    dependencyType: dependency.dependency_type,
    requiredGoalId: dependency.required_goal_id,
    requiredGoalTitle: dependency.required_goal_title,
    influencePlayerId: dependency.influence_player_id,
    influencePlayerName: dependency.influence_player_name,
    requiredInfluencePoints: dependency.required_influence_points,
    isVisibleBeforeCompletion: dependency.is_visible_before_completion,
    createdAt: new Date(dependency.created_at),
});

export const goalDependenciesMapper = (
    dependencies: IGoalDependencyResponse[],
): IGoalDependency[] => dependencies.map(goalDependencyMapper);

export const playerInfoMapper = (info: IPlayerInfoResponse): IPlayerInfo => ({
    id: info.id,
    playerId: info.player_id,
    playerName: info.player_name,
    description: info.description,
});

export const triggerParticipantMapper = (
    participant: ITriggerParticipantResponse,
): ITriggerParticipant => ({
    id: participant.id,
    triggerId: participant.trigger_id,
    playerId: participant.player_id,
    playerName: participant.player_name,
    createdAt: new Date(participant.created_at),
});

export const triggerParticipantsMapper = (
    participants: ITriggerParticipantResponse[],
): ITriggerParticipant[] => participants.map(triggerParticipantMapper);

export const abilityUsageHistoryMapper = (
    usage: IAbilityUsageHistoryResponse,
): IAbilityUsageHistory => ({
    id: usage.id,
    playerId: usage.player_id,
    playerName: usage.player_name,
    abilityId: usage.ability_id,
    abilityName: usage.ability_name,
    abilityType: usage.ability_type,
    targetPlayerId: usage.target_player_id,
    targetPlayerName: usage.target_player_name,
    infoCategory: usage.info_category,
    usedAt: new Date(usage.used_at),
});

export const abilityUsageHistoriesMapper = (
    usages: IAbilityUsageHistoryResponse[],
): IAbilityUsageHistory[] => usages.map(abilityUsageHistoryMapper);

export const revealedInfoMapper = (info: IRevealedInfoResponse): IRevealedInfo => ({
    id: info.id,
    revealerPlayerId: info.revealer_player_id,
    revealerName: info.revealer_name,
    infoType: info.info_type,
    revealedData: info.revealed_data,
    revealedAt: new Date(info.revealed_at),
});

export const revealedInfosMapper = (infos: IRevealedInfoResponse[]): IRevealedInfo[] =>
    infos.map(revealedInfoMapper);
