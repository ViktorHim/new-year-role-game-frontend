// ============================================
// ADMIN TYPES - Response/Request interfaces
// ============================================

// ========== GAME MANAGEMENT ==========
export interface IGameStatus {
    status: 'not_started' | 'in_progress' | 'paused' | 'finished';
    current_round?: number;
    started_at?: string;
    finished_at?: string;
}

export interface IStartGameRequest {
    initial_balance?: number;
}

export interface IStartGameResponse {
    message: string;
    game_id: number;
}

// ========== FACTIONS ==========
export interface IAdminFactionResponse {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface IAdminFactionsResponse {
    factions: IAdminFactionResponse[];
    count: number;
}

export interface ICreateFactionRequest {
    name: string;
    description: string;
}

export interface IUpdateFactionRequest {
    name?: string;
    description?: string;
}

// ========== PLAYERS ==========
export interface IAdminPlayerResponse {
    id: number;
    character_name: string;
    character_story: string | null;
    faction_id: number | null;
    faction_name: string | null;
    role: string | null;
    money: number;
    influence: number;
    created_at: string;
}

export interface IAdminPlayersResponse {
    players: IAdminPlayerResponse[];
    count: number;
}

export interface ICreatePlayerRequest {
    character_name: string;
    password: string;
    character_story?: string;
    role: string;
    money?: number;
    influence?: number;
    faction_id?: number;
    can_change_faction?: boolean;
    avatar?: string;
}

export interface IUpdatePlayerRequest {
    character_name: string;
    password: string;
    character_story?: string;
    role: string;
    money?: number;
    influence?: number;
    faction_id?: number;
    can_change_faction?: boolean;
    avatar?: string;
}

export interface IPlayerBalanceResponse {
    player_id: number;
    player_name: string;
    balance: number;
}

export interface IUpdateBalanceRequest {
    amount: number;
    description: string;
}

export interface IPlayerInfluenceResponse {
    player_id: number;
    player_name: string;
    influence_points: number;
}

export interface IUpdateInfluenceRequest {
    influence: number;
}

// ========== GOALS ==========
export interface IAdminGoalResponse {
    id: number;
    title: string;
    description: string;
    goal_type: 'personal' | 'faction';
    faction_id: number | null;
    faction_name: string | null;
    player_id: number | null;
    player_name: string | null;
    influence_points_reward: number;
    is_completed: boolean;
    completed_by_player_id: number | null;
    completed_by_player_name: string | null;
    completed_at: string | null;
    created_at: string;
}

export interface IAdminGoalsResponse {
    goals: IAdminGoalResponse[];
    count: number;
}

export interface ICreateGoalRequest {
    title: string;
    description: string;
    goal_type: 'personal' | 'faction';
    faction_id?: number;
    player_id?: number;
    influence_points_reward: number;
}

export interface IUpdateGoalRequest {
    title?: string;
    description?: string;
    influence_points_reward?: number;
}

export interface ICompleteGoalRequest {
    player_id: number;
}

// ========== TASKS ==========
export interface IAdminTaskResponse {
    id: number;
    task_block_id: number;
    task_block_name: string;
    title: string;
    description: string;
    task_order: number;
    influence_points_reward: number;
    money_reward: number;
    is_active: boolean;
    created_at: string;
}

export interface IAdminTasksResponse {
    tasks: IAdminTaskResponse[];
    count: number;
}

export interface ITaskBlockResponse {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface ITaskBlocksResponse {
    task_blocks: ITaskBlockResponse[];
    count: number;
}

export interface ICreateTaskBlockRequest {
    name: string;
    description: string;
}

export interface ICreateTaskRequest {
    task_block_id: number;
    title: string;
    description: string;
    task_order: number;
    influence_points_reward: number;
    money_reward: number;
}

export interface IUpdateTaskRequest {
    title?: string;
    description?: string;
    task_order?: number;
    influence_points_reward?: number;
    money_reward?: number;
}

export interface IActivateTaskRequest {
    player_ids: number[];
}

// ========== ITEMS ==========
export interface IAdminItemResponse {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface IAdminItemsResponse {
    items: IAdminItemResponse[];
    count: number;
}

export interface ICreateItemRequest {
    name: string;
    description: string;
}

export interface IUpdateItemRequest {
    name?: string;
    description?: string;
}

// ========== ITEM EFFECTS ==========
export interface IItemEffectResponse {
    id: number;
    item_id: number;
    item_name: string;
    effect_type: 'influence_boost' | 'money_boost' | 'task_bonus' | 'special';
    value: number;
    duration_minutes: number | null;
    description: string;
    created_at: string;
}

export interface IItemEffectsResponse {
    effects: IItemEffectResponse[];
    count: number;
}

export interface ICreateItemEffectRequest {
    effect_type: 'influence_boost' | 'money_boost' | 'task_bonus' | 'special';
    value: number;
    duration_minutes?: number;
    description: string;
}

export interface IUpdateItemEffectRequest {
    effect_type?: 'influence_boost' | 'money_boost' | 'task_bonus' | 'special';
    value?: number;
    duration_minutes?: number;
    description?: string;
}

// ========== ABILITIES ==========
export interface IAdminAbilityResponse {
    id: number;
    player_id: number;
    name: string;
    description: string;
    ability_type: 'reveal_info' | 'add_influence' | 'transfer_influence';
    cooldown_minutes: number | null;
    start_delay_minutes: number | null;
    required_influence_points: number | null;
    is_unlocked: boolean;
    influence_points_to_add: number | null;
    influence_points_to_remove: number | null;
    influence_points_to_self: number | null;
    created_at: string;
}

export interface IAdminAbilitiesResponse {
    abilities: IAdminAbilityResponse[];
    count: number;
}

export interface ICreateAbilityRequest {
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
}

export interface IUpdateAbilityRequest {
    name?: string;
    description?: string;
    cooldown_minutes?: number;
}

// ========== CONTRACTS SETTINGS ==========
export interface IContractSettingsResponse {
    id: number;
    contract_type: 'reveal_faction' | 'reveal_goal' | 'reveal_item';
    base_price: number;
    min_price: number;
    max_price: number;
    is_enabled: boolean;
}

export interface IAllContractSettingsResponse {
    settings: IContractSettingsResponse[];
    count: number;
}

export interface IUpdateContractSettingsRequest {
    base_price?: number;
    min_price?: number;
    max_price?: number;
    is_enabled?: boolean;
}

// ========== DEBTS SETTINGS ==========
export interface IDebtSettingsResponse {
    id: number;
    base_debt_amount: number;
    interest_rate: number;
    max_debt_multiplier: number;
    is_enabled: boolean;
}

export interface IUpdateDebtSettingsRequest {
    base_debt_amount?: number;
    interest_rate?: number;
    max_debt_multiplier?: number;
    is_enabled?: boolean;
}

// ========== MONITORING ==========
export interface IActiveContractResponse {
    id: number;
    contract_type: 'reveal_faction' | 'reveal_goal' | 'reveal_item';
    customer_player_id: number;
    customer_player_name: string;
    executor_player_id: number | null;
    executor_player_name: string | null;
    status: 'pending' | 'signed' | 'completed' | 'terminated';
    price: number;
    created_at: string;
}

export interface IActiveContractsResponse {
    contracts: IActiveContractResponse[];
    count: number;
}

export interface IDebtResponse {
    id: number;
    debtor_player_id: number;
    debtor_player_name: string;
    current_amount: number;
    interest_rate: number;
    max_amount: number;
    last_interest_applied_at: string | null;
    created_at: string;
}

export interface IDebtsResponse {
    debts: IDebtResponse[];
    count: number;
}

export interface IBalanceTransactionResponse {
    id: number;
    player_id: number;
    player_name: string;
    amount: number;
    transaction_type: string;
    description: string;
    created_at: string;
}

export interface IBalanceTransactionsResponse {
    transactions: IBalanceTransactionResponse[];
    count: number;
}

// ========== GOAL RACE ==========
export interface IGoalRaceTriggerResponse {
    id: number;
    name: string;
    description: string;
    required_tasks_count: number;
    is_active: boolean;
    created_at: string;
}

export interface IGoalRaceTriggersResponse {
    triggers: IGoalRaceTriggerResponse[];
    count: number;
}

export interface ICreateGoalRaceTriggerRequest {
    name: string;
    description: string;
    required_tasks_count: number;
    participant_ids: number[];
}

export interface IUpdateGoalRaceTriggerRequest {
    name?: string;
    description?: string;
    required_tasks_count?: number;
}

export interface IPredefinedGoalResponse {
    id: number;
    trigger_id: number;
    round_number: number;
    player_id: number;
    player_name: string;
    title: string;
    description: string;
    influence_points_reward: number;
    created_at: string;
}

export interface IPredefinedGoalsResponse {
    goals: IPredefinedGoalResponse[];
    count: number;
}

export interface ICreatePredefinedGoalRequest {
    round_number: number;
    player_id: number;
    title: string;
    description: string;
    influence_points_reward: number;
}

export interface IBatchPredefinedGoalsRequest {
    trigger_id: number;
    goals: Array<{
        round_number: number;
        player_id: number;
        title: string;
        description: string;
        influence_points_reward: number;
    }>;
}

export interface IGoalRaceHistoryResponse {
    id: number;
    trigger_id: number;
    trigger_name: string;
    round_number: number;
    winner_player_id: number;
    winner_player_name: string;
    started_at: string;
    completed_at: string | null;
}

export interface IGoalRaceHistoriesResponse {
    history: IGoalRaceHistoryResponse[];
    count: number;
}

// ========== RELATIONS ==========
export interface IPlayerInventoryItemResponse {
    id: number;
    item_id: number;
    item_name: string;
    description: string;
    acquired_at: string;
}

export interface IPlayerInventoryResponse {
    player_id: number;
    items: IPlayerInventoryItemResponse[];
    count: number;
}

export interface IAddItemToPlayerRequest {
    item_id: number;
}

export interface IBatchItemsToPlayerRequest {
    item_ids: number[];
}

export interface IGoalDependencyResponse {
    id: number;
    goal_id: number;
    dependency_type: 'goal_completion' | 'influence_threshold';
    required_goal_id: number | null;
    required_goal_title: string | null;
    influence_player_id: number | null;
    influence_player_name: string | null;
    required_influence_points: number | null;
    is_visible_before_completion: boolean;
    created_at: string;
}

export interface IGoalDependenciesResponse {
    goal_id: number;
    dependencies: IGoalDependencyResponse[];
    count: number;
}

export interface ICreateGoalDependencyRequest {
    dependency_type: 'goal_completion' | 'influence_threshold';
    required_goal_id?: number;
    influence_player_id?: number;
    required_influence_points?: number;
    is_visible_before_completion: boolean;
}

export interface IPlayerInfoResponse {
    id: number;
    player_id: number;
    player_name: string;
    description: string;
}

export interface ICreatePlayerInfoRequest {
    description: string;
}

export interface IUpdatePlayerInfoRequest {
    description: string;
}

export interface ITriggerParticipantResponse {
    id: number;
    trigger_id: number;
    player_id: number;
    player_name: string;
    created_at: string;
}

export interface ITriggerParticipantsResponse {
    trigger_id: number;
    participants: ITriggerParticipantResponse[];
    count: number;
}

export interface IAddTriggerParticipantRequest {
    player_id: number;
}

export interface IBatchTriggerParticipantsRequest {
    player_ids: number[];
}

export interface IAbilityUsageHistoryResponse {
    id: number;
    player_id: number;
    player_name: string;
    ability_id: number;
    ability_name: string;
    ability_type: string;
    target_player_id: number | null;
    target_player_name: string | null;
    info_category: string | null;
    used_at: string;
}

export interface IAbilityUsageHistoriesResponse {
    usage_history: IAbilityUsageHistoryResponse[];
    count: number;
}

export interface IRevealedInfoResponse {
    id: number;
    revealer_player_id: number;
    revealer_name: string;
    info_type: string;
    revealed_data: string;
    revealed_at: string;
}

export interface IRevealedInfosResponse {
    player_id: number;
    revealed_info: IRevealedInfoResponse[];
    count: number;
}

// ========== DOMAIN MODELS (camelCase) ==========
export interface IAdminFaction {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
}

export interface IAdminPlayer {
    id: number;
    characterName: string;
    characterStory: string | null;
    factionId: number | null;
    factionName: string | null;
    role: string | null;
    money: number;
    influence: number;
    createdAt: Date;
}

export interface IAdminGoal {
    id: number;
    title: string;
    description: string;
    goalType: 'personal' | 'general' | 'faction';
    factionId: number | null;
    factionName: string | null;
    playerId: number | null;
    playerName: string | null;
    influencePointsReward: number;
    isCompleted: boolean;
    completedByPlayerId: number | null;
    completedByPlayerName: string | null;
    completedAt: Date | null;
    createdAt: Date;
}

export interface IAdminTask {
    id: number;
    taskBlockId: number;
    taskBlockName: string;
    title: string;
    description: string;
    taskOrder: number;
    influencePointsReward: number;
    moneyReward: number;
    isActive: boolean;
    createdAt: Date;
}

export interface ITaskBlock {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
}

export interface IAdminItem {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
}

export interface IItemEffect {
    id: number;
    itemId: number;
    itemName: string;
    effectType: 'influence_boost' | 'money_boost' | 'task_bonus' | 'special';
    value: number;
    durationMinutes: number | null;
    description: string;
    createdAt: Date;
}

export interface IAdminAbility {
    id: number;
    playerId: number;
    name: string;
    description: string;
    abilityType: 'reveal_info' | 'add_influence' | 'transfer_influence';
    cooldownMinutes: number | null;
    startDelayMinutes: number | null;
    requiredInfluencePoints: number | null;
    isUnlocked: boolean;
    influencePointsToAdd: number | null;
    influencePointsToRemove: number | null;
    influencePointsToSelf: number | null;
    createdAt: Date;
}

export interface IContractSettings {
    id: number;
    contractType: 'reveal_faction' | 'reveal_goal' | 'reveal_item';
    basePrice: number;
    minPrice: number;
    maxPrice: number;
    isEnabled: boolean;
}

export interface IDebtSettings {
    id: number;
    baseDebtAmount: number;
    interestRate: number;
    maxDebtMultiplier: number;
    isEnabled: boolean;
}

export interface IActiveContract {
    id: number;
    contractType: 'reveal_faction' | 'reveal_goal' | 'reveal_item';
    customerPlayerId: number;
    customerPlayerName: string;
    executorPlayerId: number | null;
    executorPlayerName: string | null;
    status: 'pending' | 'signed' | 'completed' | 'terminated';
    price: number;
    createdAt: Date;
}

export interface IDebt {
    id: number;
    debtorPlayerId: number;
    debtorPlayerName: string;
    currentAmount: number;
    interestRate: number;
    maxAmount: number;
    lastInterestAppliedAt: Date | null;
    createdAt: Date;
}

export interface IBalanceTransaction {
    id: number;
    playerId: number;
    playerName: string;
    amount: number;
    transactionType: string;
    description: string;
    createdAt: Date;
}

export interface IGoalRaceTrigger {
    id: number;
    name: string;
    description: string;
    requiredTasksCount: number;
    isActive: boolean;
    createdAt: Date;
}

export interface IPredefinedGoal {
    id: number;
    triggerId: number;
    roundNumber: number;
    playerId: number;
    playerName: string;
    title: string;
    description: string;
    influencePointsReward: number;
    createdAt: Date;
}

export interface IGoalRaceHistory {
    id: number;
    triggerId: number;
    triggerName: string;
    roundNumber: number;
    winnerPlayerId: number;
    winnerPlayerName: string;
    startedAt: Date;
    completedAt: Date | null;
}

export interface IPlayerInventoryItem {
    id: number;
    itemId: number;
    itemName: string;
    description: string;
    acquiredAt: Date;
}

export interface IGoalDependency {
    id: number;
    goalId: number;
    dependencyType: 'goal_completion' | 'influence_threshold';
    requiredGoalId: number | null;
    requiredGoalTitle: string | null;
    influencePlayerId: number | null;
    influencePlayerName: string | null;
    requiredInfluencePoints: number | null;
    isVisibleBeforeCompletion: boolean;
    createdAt: Date;
}

export interface IPlayerInfo {
    id: number;
    playerId: number;
    playerName: string;
    description: string;
}

export interface ITriggerParticipant {
    id: number;
    triggerId: number;
    playerId: number;
    playerName: string;
    createdAt: Date;
}

export interface IAbilityUsageHistory {
    id: number;
    playerId: number;
    playerName: string;
    abilityId: number;
    abilityName: string;
    abilityType: string;
    targetPlayerId: number | null;
    targetPlayerName: string | null;
    infoCategory: string | null;
    usedAt: Date;
}

export interface IRevealedInfo {
    id: number;
    revealerPlayerId: number;
    revealerName: string;
    infoType: string;
    revealedData: string;
    revealedAt: Date;
}
