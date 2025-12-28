import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type {
    IGameStatus,
    IStartGameRequest,
    IStartGameResponse,
    IAdminFactionsResponse,
    ICreateFactionRequest,
    IUpdateFactionRequest,
    IAdminPlayersResponse,
    ICreatePlayerRequest,
    IUpdatePlayerRequest,
    IPlayerBalanceResponse,
    IUpdateBalanceRequest,
    IPlayerInfluenceResponse,
    IUpdateInfluenceRequest,
    IAdminGoalsResponse,
    ICreateGoalRequest,
    IUpdateGoalRequest,
    ICompleteGoalRequest,
    IAdminTasksResponse,
    ITaskBlocksResponse,
    ICreateTaskBlockRequest,
    ICreateTaskRequest,
    IUpdateTaskRequest,
    IActivateTaskRequest,
    IAdminItemsResponse,
    ICreateItemRequest,
    IUpdateItemRequest,
    IItemEffectsResponse,
    ICreateItemEffectRequest,
    IUpdateItemEffectRequest,
    IAdminAbilitiesResponse,
    ICreateAbilityRequest,
    IUpdateAbilityRequest,
    IAllContractSettingsResponse,
    IUpdateContractSettingsRequest,
    IDebtSettingsResponse,
    IUpdateDebtSettingsRequest,
    IActiveContractsResponse,
    IDebtsResponse,
    IBalanceTransactionsResponse,
    IGoalRaceTriggersResponse,
    ICreateGoalRaceTriggerRequest,
    IUpdateGoalRaceTriggerRequest,
    IPredefinedGoalsResponse,
    ICreatePredefinedGoalRequest,
    IBatchPredefinedGoalsRequest,
    IGoalRaceHistoriesResponse,
    IPlayerInventoryResponse,
    IAddItemToPlayerRequest,
    IBatchItemsToPlayerRequest,
    IGoalDependenciesResponse,
    ICreateGoalDependencyRequest,
    IPlayerInfoResponse,
    ICreatePlayerInfoRequest,
    IUpdatePlayerInfoRequest,
    ITriggerParticipantsResponse,
    IAddTriggerParticipantRequest,
    IBatchTriggerParticipantsRequest,
    IAbilityUsageHistoriesResponse,
    IRevealedInfosResponse,
} from '../model/types';

const endpoints = {
    // ========== GAME MANAGEMENT ==========
    GET_GAME_STATUS: '/game/stats',
    START_GAME: '/admin/game/start',
    PAUSE_GAME: '/admin/game/pause',
    FINISH_GAME: '/admin/game/end',

    // ========== FACTIONS ==========
    GET_FACTIONS: '/admin/factions',
    CREATE_FACTION: '/admin/factions',
    UPDATE_FACTION: (id: number) => `/admin/factions/${id}`,
    DELETE_FACTION: (id: number) => `/admin/factions/${id}`,

    // ========== PLAYERS ==========
    GET_PLAYERS: '/admin/players',
    CREATE_PLAYER: '/admin/players',
    UPDATE_PLAYER: (id: number) => `/admin/players/${id}`,
    DELETE_PLAYER: (id: number) => `/admin/players/${id}`,
    GET_PLAYER_BALANCE: (id: number) => `/admin/players/${id}/money`,
    UPDATE_PLAYER_BALANCE: (id: number) => `/admin/players/${id}/money`,
    GET_PLAYER_INFLUENCE: (id: number) => `/admin/players/${id}/influence`,
    UPDATE_PLAYER_INFLUENCE: (id: number) => `/admin/players/${id}/influence`,

    // ========== GOALS ==========
    GET_GOALS: '/admin/goals',
    CREATE_GOAL: '/admin/goals',
    UPDATE_GOAL: (id: number) => `/admin/goals/${id}`,
    DELETE_GOAL: (id: number) => `/admin/goals/${id}`,
    COMPLETE_GOAL: (id: number) => `/admin/goals/${id}/complete`,

    // ========== TASKS ==========
    GET_TASK_BLOCKS: '/admin/task-blocks',
    CREATE_TASK_BLOCK: '/admin/task-blocks',
    UPDATE_TASK_BLOCK: (id: number) => `/admin/task-blocks/${id}`,
    DELETE_TASK_BLOCK: (id: number) => `/admin/task-blocks/${id}`,
    GET_TASKS: '/admin/tasks',
    CREATE_TASK: '/admin/tasks',
    UPDATE_TASK: (id: number) => `/admin/tasks/${id}`,
    DELETE_TASK: (id: number) => `/admin/tasks/${id}`,
    ACTIVATE_TASK: (id: number) => `/admin/tasks/${id}/activate`,
    DEACTIVATE_TASK: (id: number) => `/admin/tasks/${id}/deactivate`,

    // ========== ITEMS ==========
    GET_ITEMS: '/admin/items',
    CREATE_ITEM: '/admin/items',
    UPDATE_ITEM: (id: number) => `/admin/items/${id}`,
    DELETE_ITEM: (id: number) => `/admin/items/${id}`,
    GET_ITEM_EFFECTS: (itemId: number) => `/admin/items/${itemId}/effects`,
    CREATE_ITEM_EFFECT: (itemId: number) => `/admin/items/${itemId}/effects`,
    UPDATE_ITEM_EFFECT: (itemId: number, effectId: number) =>
        `/admin/items/${itemId}/effects/${effectId}`,
    DELETE_ITEM_EFFECT: (itemId: number, effectId: number) =>
        `/admin/items/${itemId}/effects/${effectId}`,

    // ========== ABILITIES ==========
    GET_ABILITIES: '/admin/abilities',
    CREATE_ABILITY: '/admin/abilities',
    UPDATE_ABILITY: (id: number) => `/admin/abilities/${id}`,
    DELETE_ABILITY: (id: number) => `/admin/abilities/${id}`,

    // ========== CONTRACT SETTINGS ==========
    GET_CONTRACT_SETTINGS: '/admin/contract-settings',
    UPDATE_CONTRACT_SETTINGS: (contractType: string) => `/admin/contract-settings/${contractType}`,

    // ========== DEBT SETTINGS ==========
    GET_DEBT_SETTINGS: '/admin/debt-settings',
    UPDATE_DEBT_SETTINGS: '/admin/debt-settings',

    // ========== MONITORING ==========
    GET_ACTIVE_CONTRACTS: '/admin/contracts',
    GET_DEBTS: '/admin/debts',
    GET_BALANCE_TRANSACTIONS: '/admin/transactions',

    // ========== GOAL RACE ==========
    GET_GOAL_RACE_TRIGGERS: '/admin/goal-race/triggers',
    CREATE_GOAL_RACE_TRIGGER: '/admin/goal-race/triggers',
    UPDATE_GOAL_RACE_TRIGGER: (id: number) => `/admin/goal-race/triggers/${id}`,
    DELETE_GOAL_RACE_TRIGGER: (id: number) => `/admin/goal-race/triggers/${id}`,
    GET_PREDEFINED_GOALS: (triggerId: number) => `/admin/goal-race/triggers/${triggerId}/goals`,
    CREATE_PREDEFINED_GOAL: (triggerId: number) => `/admin/goal-race/triggers/${triggerId}/goals`,
    CREATE_BATCH_PREDEFINED_GOALS: '/admin/goal-race/predefined-goals/batch',
    DELETE_PREDEFINED_GOAL: (triggerId: number, goalId: number) =>
        `/admin/goal-race/triggers/${triggerId}/goals/${goalId}`,
    GET_GOAL_RACE_HISTORY: '/admin/goal-race/history',

    // ========== RELATIONS ==========
    GET_PLAYER_INVENTORY: (playerId: number) => `/admin/players/${playerId}/inventory`,
    ADD_ITEM_TO_PLAYER: (playerId: number) => `/admin/players/${playerId}/inventory`,
    ADD_BATCH_ITEMS_TO_PLAYER: (playerId: number) => `/admin/players/${playerId}/inventory/batch`,
    REMOVE_ITEM_FROM_PLAYER: (playerId: number, itemId: number) =>
        `/admin/players/${playerId}/inventory/${itemId}`,

    GET_GOAL_DEPENDENCIES: (goalId: number) => `/admin/goals/${goalId}/dependencies`,
    ADD_GOAL_DEPENDENCY: (goalId: number) => `/admin/goals/${goalId}/dependencies`,
    DELETE_GOAL_DEPENDENCY: (goalId: number, dependencyId: number) =>
        `/admin/goals/${goalId}/dependencies/${dependencyId}`,

    GET_PLAYER_INFO: (playerId: number) => `/admin/players/${playerId}/info`,
    CREATE_PLAYER_INFO: (playerId: number) => `/admin/players/${playerId}/info`,
    UPDATE_PLAYER_INFO: (playerId: number) => `/admin/players/${playerId}/info`,
    DELETE_PLAYER_INFO: (playerId: number) => `/admin/players/${playerId}/info`,

    GET_TRIGGER_PARTICIPANTS: (triggerId: number) =>
        `/admin/goal-race/triggers/${triggerId}/participants`,
    ADD_TRIGGER_PARTICIPANT: (triggerId: number) =>
        `/admin/goal-race/triggers/${triggerId}/participants`,
    ADD_BATCH_TRIGGER_PARTICIPANTS: (triggerId: number) =>
        `/admin/goal-race/triggers/${triggerId}/participants/batch`,
    REMOVE_TRIGGER_PARTICIPANT: (triggerId: number, playerId: number) =>
        `/admin/goal-race/triggers/${triggerId}/participants/${playerId}`,

    GET_ABILITY_USAGE_HISTORY: '/admin/abilities/usage-history',
    GET_PLAYER_REVEALED_INFO: (playerId: number) => `/admin/players/${playerId}/revealed-info`,
};

export const AdminService = {
    // ========== GAME MANAGEMENT ==========
    getGameStatus: (): Promise<AxiosResponse<IGameStatus>> => {
        return http.get(endpoints.GET_GAME_STATUS);
    },

    startGame: (payload?: IStartGameRequest): Promise<AxiosResponse<IStartGameResponse>> => {
        return http.post(endpoints.START_GAME, payload);
    },

    pauseGame: (): Promise<AxiosResponse<{ message: string }>> => {
        return http.post(endpoints.PAUSE_GAME);
    },

    finishGame: (): Promise<AxiosResponse<{ message: string }>> => {
        return http.post(endpoints.FINISH_GAME);
    },

    // ========== FACTIONS ==========
    getFactions: (): Promise<AxiosResponse<IAdminFactionsResponse>> => {
        return http.get(endpoints.GET_FACTIONS);
    },

    createFaction: (
        payload: ICreateFactionRequest,
    ): Promise<AxiosResponse<{ message: string; faction_id: number }>> => {
        return http.post(endpoints.CREATE_FACTION, payload);
    },

    updateFaction: (
        id: number,
        payload: IUpdateFactionRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_FACTION(id), payload);
    },

    deleteFaction: (id: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_FACTION(id));
    },

    // ========== PLAYERS ==========
    getPlayers: (): Promise<AxiosResponse<IAdminPlayersResponse>> => {
        return http.get(endpoints.GET_PLAYERS);
    },

    createPlayer: (
        payload: ICreatePlayerRequest,
    ): Promise<AxiosResponse<{ message: string; player_id: number }>> => {
        return http.post(endpoints.CREATE_PLAYER, payload);
    },

    updatePlayer: (
        id: number,
        payload: IUpdatePlayerRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_PLAYER(id), payload);
    },

    deletePlayer: (id: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_PLAYER(id));
    },

    getPlayerBalance: (id: number): Promise<AxiosResponse<IPlayerBalanceResponse>> => {
        return http.get(endpoints.GET_PLAYER_BALANCE(id));
    },

    updatePlayerBalance: (
        id: number,
        payload: IUpdateBalanceRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_PLAYER_BALANCE(id), payload);
    },

    getPlayerInfluence: (id: number): Promise<AxiosResponse<IPlayerInfluenceResponse>> => {
        return http.get(endpoints.GET_PLAYER_INFLUENCE(id));
    },

    updatePlayerInfluence: (
        id: number,
        payload: IUpdateInfluenceRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_PLAYER_INFLUENCE(id), payload);
    },

    // ========== GOALS ==========
    getGoals: (): Promise<AxiosResponse<IAdminGoalsResponse>> => {
        return http.get(endpoints.GET_GOALS);
    },

    createGoal: (
        payload: ICreateGoalRequest,
    ): Promise<AxiosResponse<{ message: string; goal_id: number }>> => {
        return http.post(endpoints.CREATE_GOAL, payload);
    },

    updateGoal: (
        id: number,
        payload: IUpdateGoalRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_GOAL(id), payload);
    },

    deleteGoal: (id: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_GOAL(id));
    },

    completeGoal: (
        id: number,
        payload: ICompleteGoalRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.post(endpoints.COMPLETE_GOAL(id), payload);
    },

    // ========== TASKS ==========
    getTaskBlocks: (): Promise<AxiosResponse<ITaskBlocksResponse>> => {
        return http.get(endpoints.GET_TASK_BLOCKS);
    },

    createTaskBlock: (
        payload: ICreateTaskBlockRequest,
    ): Promise<AxiosResponse<{ message: string; task_block_id: number }>> => {
        return http.post(endpoints.CREATE_TASK_BLOCK, payload);
    },

    updateTaskBlock: (
        id: number,
        payload: ICreateTaskBlockRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_TASK_BLOCK(id), payload);
    },

    deleteTaskBlock: (id: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_TASK_BLOCK(id));
    },

    getTasks: (): Promise<AxiosResponse<IAdminTasksResponse>> => {
        return http.get(endpoints.GET_TASKS);
    },

    createTask: (
        payload: ICreateTaskRequest,
    ): Promise<AxiosResponse<{ message: string; task_id: number }>> => {
        return http.post(endpoints.CREATE_TASK, payload);
    },

    updateTask: (
        id: number,
        payload: IUpdateTaskRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_TASK(id), payload);
    },

    deleteTask: (id: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_TASK(id));
    },

    activateTask: (
        id: number,
        payload: IActivateTaskRequest,
    ): Promise<AxiosResponse<{ message: string; activated_count: number }>> => {
        return http.post(endpoints.ACTIVATE_TASK(id), payload);
    },

    deactivateTask: (id: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.post(endpoints.DEACTIVATE_TASK(id));
    },

    // ========== ITEMS ==========
    getItems: (): Promise<AxiosResponse<IAdminItemsResponse>> => {
        return http.get(endpoints.GET_ITEMS);
    },

    createItem: (
        payload: ICreateItemRequest,
    ): Promise<AxiosResponse<{ message: string; item_id: number }>> => {
        return http.post(endpoints.CREATE_ITEM, payload);
    },

    updateItem: (
        id: number,
        payload: IUpdateItemRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_ITEM(id), payload);
    },

    deleteItem: (id: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_ITEM(id));
    },

    getItemEffects: (itemId: number): Promise<AxiosResponse<IItemEffectsResponse>> => {
        return http.get(endpoints.GET_ITEM_EFFECTS(itemId));
    },

    createItemEffect: (
        itemId: number,
        payload: ICreateItemEffectRequest,
    ): Promise<AxiosResponse<{ message: string; effect_id: number }>> => {
        return http.post(endpoints.CREATE_ITEM_EFFECT(itemId), payload);
    },

    updateItemEffect: (
        itemId: number,
        effectId: number,
        payload: IUpdateItemEffectRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_ITEM_EFFECT(itemId, effectId), payload);
    },

    deleteItemEffect: (
        itemId: number,
        effectId: number,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_ITEM_EFFECT(itemId, effectId));
    },

    // ========== ABILITIES ==========
    getAbilities: (): Promise<AxiosResponse<IAdminAbilitiesResponse>> => {
        return http.get(endpoints.GET_ABILITIES);
    },

    createAbility: (
        payload: ICreateAbilityRequest,
    ): Promise<AxiosResponse<{ message: string; ability_id: number }>> => {
        return http.post(endpoints.CREATE_ABILITY, payload);
    },

    updateAbility: (
        id: number,
        payload: IUpdateAbilityRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_ABILITY(id), payload);
    },

    deleteAbility: (id: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_ABILITY(id));
    },

    // ========== CONTRACT SETTINGS ==========
    getContractSettings: (): Promise<AxiosResponse<IAllContractSettingsResponse>> => {
        return http.get(endpoints.GET_CONTRACT_SETTINGS);
    },

    updateContractSettings: (
        contractType: string,
        payload: IUpdateContractSettingsRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_CONTRACT_SETTINGS(contractType), payload);
    },

    // ========== DEBT SETTINGS ==========
    getDebtSettings: (): Promise<AxiosResponse<IDebtSettingsResponse>> => {
        return http.get(endpoints.GET_DEBT_SETTINGS);
    },

    updateDebtSettings: (
        payload: IUpdateDebtSettingsRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_DEBT_SETTINGS, payload);
    },

    // ========== MONITORING ==========
    getActiveContracts: (): Promise<AxiosResponse<IActiveContractsResponse>> => {
        return http.get(endpoints.GET_ACTIVE_CONTRACTS);
    },

    getDebts: (): Promise<AxiosResponse<IDebtsResponse>> => {
        return http.get(endpoints.GET_DEBTS);
    },

    getBalanceTransactions: (params?: {
        limit?: number;
        player_id?: number;
    }): Promise<AxiosResponse<IBalanceTransactionsResponse>> => {
        return http.get(endpoints.GET_BALANCE_TRANSACTIONS, { params });
    },

    // ========== GOAL RACE ==========
    getGoalRaceTriggers: (): Promise<AxiosResponse<IGoalRaceTriggersResponse>> => {
        return http.get(endpoints.GET_GOAL_RACE_TRIGGERS);
    },

    createGoalRaceTrigger: (
        payload: ICreateGoalRaceTriggerRequest,
    ): Promise<AxiosResponse<{ message: string; trigger_id: number }>> => {
        return http.post(endpoints.CREATE_GOAL_RACE_TRIGGER, payload);
    },

    updateGoalRaceTrigger: (
        id: number,
        payload: IUpdateGoalRaceTriggerRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_GOAL_RACE_TRIGGER(id), payload);
    },

    deleteGoalRaceTrigger: (id: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_GOAL_RACE_TRIGGER(id));
    },

    getPredefinedGoals: (triggerId: number): Promise<AxiosResponse<IPredefinedGoalsResponse>> => {
        return http.get(endpoints.GET_PREDEFINED_GOALS(triggerId));
    },

    createPredefinedGoal: (
        triggerId: number,
        payload: ICreatePredefinedGoalRequest,
    ): Promise<AxiosResponse<{ message: string; goal_id: number }>> => {
        return http.post(endpoints.CREATE_PREDEFINED_GOAL(triggerId), payload);
    },

    createBatchPredefinedGoals: (
        payload: IBatchPredefinedGoalsRequest,
    ): Promise<AxiosResponse<{ message: string; created_count: number }>> => {
        return http.post(endpoints.CREATE_BATCH_PREDEFINED_GOALS, payload);
    },

    deletePredefinedGoal: (
        triggerId: number,
        goalId: number,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_PREDEFINED_GOAL(triggerId, goalId));
    },

    getGoalRaceHistory: (params?: {
        trigger_id?: number;
        limit?: number;
    }): Promise<AxiosResponse<IGoalRaceHistoriesResponse>> => {
        return http.get(endpoints.GET_GOAL_RACE_HISTORY, { params });
    },

    // ========== RELATIONS ==========
    getPlayerInventory: (playerId: number): Promise<AxiosResponse<IPlayerInventoryResponse>> => {
        return http.get(endpoints.GET_PLAYER_INVENTORY(playerId));
    },

    addItemToPlayer: (
        playerId: number,
        payload: IAddItemToPlayerRequest,
    ): Promise<AxiosResponse<{ message: string; inventory_id: number }>> => {
        return http.post(endpoints.ADD_ITEM_TO_PLAYER(playerId), payload);
    },

    addBatchItemsToPlayer: (
        playerId: number,
        payload: IBatchItemsToPlayerRequest,
    ): Promise<AxiosResponse<{ message: string; added_count: number }>> => {
        return http.post(endpoints.ADD_BATCH_ITEMS_TO_PLAYER(playerId), payload);
    },

    removeItemFromPlayer: (
        playerId: number,
        itemId: number,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.REMOVE_ITEM_FROM_PLAYER(playerId, itemId));
    },

    getGoalDependencies: (goalId: number): Promise<AxiosResponse<IGoalDependenciesResponse>> => {
        return http.get(endpoints.GET_GOAL_DEPENDENCIES(goalId));
    },

    addGoalDependency: (
        goalId: number,
        payload: ICreateGoalDependencyRequest,
    ): Promise<AxiosResponse<{ message: string; dependency_id: number }>> => {
        return http.post(endpoints.ADD_GOAL_DEPENDENCY(goalId), payload);
    },

    deleteGoalDependency: (
        goalId: number,
        dependencyId: number,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_GOAL_DEPENDENCY(goalId, dependencyId));
    },

    getPlayerInfo: (playerId: number): Promise<AxiosResponse<IPlayerInfoResponse>> => {
        return http.get(endpoints.GET_PLAYER_INFO(playerId));
    },

    createPlayerInfo: (
        playerId: number,
        payload: ICreatePlayerInfoRequest,
    ): Promise<AxiosResponse<{ message: string; info_id: number }>> => {
        return http.post(endpoints.CREATE_PLAYER_INFO(playerId), payload);
    },

    updatePlayerInfo: (
        playerId: number,
        payload: IUpdatePlayerInfoRequest,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.put(endpoints.UPDATE_PLAYER_INFO(playerId), payload);
    },

    deletePlayerInfo: (playerId: number): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.DELETE_PLAYER_INFO(playerId));
    },

    getTriggerParticipants: (
        triggerId: number,
    ): Promise<AxiosResponse<ITriggerParticipantsResponse>> => {
        return http.get(endpoints.GET_TRIGGER_PARTICIPANTS(triggerId));
    },

    addTriggerParticipant: (
        triggerId: number,
        payload: IAddTriggerParticipantRequest,
    ): Promise<AxiosResponse<{ message: string; participant_id: number }>> => {
        return http.post(endpoints.ADD_TRIGGER_PARTICIPANT(triggerId), payload);
    },

    addBatchTriggerParticipants: (
        triggerId: number,
        payload: IBatchTriggerParticipantsRequest,
    ): Promise<AxiosResponse<{ message: string; added_count: number }>> => {
        return http.post(endpoints.ADD_BATCH_TRIGGER_PARTICIPANTS(triggerId), payload);
    },

    removeTriggerParticipant: (
        triggerId: number,
        playerId: number,
    ): Promise<AxiosResponse<{ message: string }>> => {
        return http.delete(endpoints.REMOVE_TRIGGER_PARTICIPANT(triggerId, playerId));
    },

    getAbilityUsageHistory: (params?: {
        limit?: number;
        player_id?: number;
        ability_id?: number;
    }): Promise<AxiosResponse<IAbilityUsageHistoriesResponse>> => {
        return http.get(endpoints.GET_ABILITY_USAGE_HISTORY, { params });
    },

    getPlayerRevealedInfo: (playerId: number): Promise<AxiosResponse<IRevealedInfosResponse>> => {
        return http.get(endpoints.GET_PLAYER_REVEALED_INFO(playerId));
    },
};
