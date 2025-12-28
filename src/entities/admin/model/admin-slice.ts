import type { ImmerSlice } from '@/app/store';
import { toast } from 'sonner';
import { AdminService } from '../api/admin-service';
import {
    factionsMapper,
    playersMapper,
    goalsMapper,
    tasksMapper,
    taskBlocksMapper,
    itemsMapper,
    itemEffectsMapper,
    abilitiesMapper,
    contractSettingsListMapper,
    debtSettingsMapper,
    activeContractsMapper,
    debtsMapper,
    balanceTransactionsMapper,
    goalRaceTriggersMapper,
    predefinedGoalsMapper,
    goalRaceHistoriesMapper,
    playerInventoryItemsMapper,
    goalDependenciesMapper,
    playerInfoMapper,
    triggerParticipantsMapper,
    abilityUsageHistoriesMapper,
    revealedInfosMapper,
} from './mappers';
import type {
    IAdminFaction,
    IAdminPlayer,
    IAdminGoal,
    IAdminTask,
    ITaskBlock,
    IAdminItem,
    IItemEffect,
    IAdminAbility,
    IContractSettings,
    IDebtSettings,
    IActiveContract,
    IDebt,
    IBalanceTransaction,
    IGoalRaceTrigger,
    IPredefinedGoal,
    IGoalRaceHistory,
    IPlayerInventoryItem,
    IGoalDependency,
    IPlayerInfo,
    ITriggerParticipant,
    IAbilityUsageHistory,
    IRevealedInfo,
    ICreateFactionRequest,
    IUpdateFactionRequest,
    ICreatePlayerRequest,
    IUpdatePlayerRequest,
    IUpdateBalanceRequest,
    IUpdateInfluenceRequest,
    ICreateGoalRequest,
    IUpdateGoalRequest,
    ICompleteGoalRequest,
    ICreateTaskBlockRequest,
    ICreateTaskRequest,
    IUpdateTaskRequest,
    IActivateTaskRequest,
    ICreateItemRequest,
    IUpdateItemRequest,
    ICreateItemEffectRequest,
    IUpdateItemEffectRequest,
    ICreateAbilityRequest,
    IUpdateAbilityRequest,
    IUpdateContractSettingsRequest,
    IUpdateDebtSettingsRequest,
    ICreateGoalRaceTriggerRequest,
    IUpdateGoalRaceTriggerRequest,
    ICreatePredefinedGoalRequest,
    IBatchPredefinedGoalsRequest,
    IAddItemToPlayerRequest,
    IBatchItemsToPlayerRequest,
    ICreateGoalDependencyRequest,
    ICreatePlayerInfoRequest,
    IUpdatePlayerInfoRequest,
    IAddTriggerParticipantRequest,
    IBatchTriggerParticipantsRequest,
    IStartGameRequest,
    IGameStatus,
} from './types';

export interface AdminStore {
    // Game status
    gameStatus: IGameStatus | null;

    // Entities
    factions: IAdminFaction[];
    players: IAdminPlayer[];
    goals: IAdminGoal[];
    tasks: IAdminTask[];
    taskBlocks: ITaskBlock[];
    items: IAdminItem[];
    itemEffects: IItemEffect[];
    abilities: IAdminAbility[];

    // Settings
    contractSettings: IContractSettings[];
    debtSettings: IDebtSettings | null;

    // Monitoring
    activeContracts: IActiveContract[];
    debts: IDebt[];
    balanceTransactions: IBalanceTransaction[];

    // Goal Race
    goalRaceTriggers: IGoalRaceTrigger[];
    predefinedGoals: IPredefinedGoal[];
    goalRaceHistory: IGoalRaceHistory[];

    // Relations
    playerInventoryItems: IPlayerInventoryItem[];
    goalDependencies: IGoalDependency[];
    playerInfo: IPlayerInfo | null;
    triggerParticipants: ITriggerParticipant[];
    abilityUsageHistory: IAbilityUsageHistory[];
    revealedInfos: IRevealedInfo[];

    // Loading states
    isLoading: boolean;
    isLoadingPlayers: boolean;
    isLoadingFactions: boolean;
    isLoadingGoals: boolean;
    isLoadingTasks: boolean;
    isLoadingItems: boolean;

    // ========== GAME MANAGEMENT ==========
    getGameStatus: () => Promise<void>;
    startGame: (payload?: IStartGameRequest) => Promise<void>;
    pauseGame: () => Promise<void>;
    finishGame: () => Promise<void>;

    // ========== FACTIONS ==========
    getFactions: () => Promise<void>;
    createFaction: (payload: ICreateFactionRequest) => Promise<void>;
    updateFaction: (id: number, payload: IUpdateFactionRequest) => Promise<void>;
    deleteFaction: (id: number) => Promise<void>;

    // ========== PLAYERS ==========
    getPlayers: () => Promise<void>;
    createPlayer: (payload: ICreatePlayerRequest) => Promise<void>;
    updatePlayer: (id: number, payload: IUpdatePlayerRequest) => Promise<void>;
    deletePlayer: (id: number) => Promise<void>;
    updatePlayerBalance: (id: number, payload: IUpdateBalanceRequest) => Promise<void>;
    updatePlayerInfluence: (id: number, payload: IUpdateInfluenceRequest) => Promise<void>;

    // ========== GOALS ==========
    getGoals: () => Promise<void>;
    createGoal: (payload: ICreateGoalRequest) => Promise<void>;
    updateGoal: (id: number, payload: IUpdateGoalRequest) => Promise<void>;
    deleteGoal: (id: number) => Promise<void>;
    completeGoal: (id: number, payload: ICompleteGoalRequest) => Promise<void>;

    // ========== TASKS ==========
    getTaskBlocks: () => Promise<void>;
    createTaskBlock: (payload: ICreateTaskBlockRequest) => Promise<void>;
    updateTaskBlock: (id: number, payload: ICreateTaskBlockRequest) => Promise<void>;
    deleteTaskBlock: (id: number) => Promise<void>;
    getTasks: () => Promise<void>;
    createTask: (payload: ICreateTaskRequest) => Promise<void>;
    updateTask: (id: number, payload: IUpdateTaskRequest) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    activateTask: (id: number, payload: IActivateTaskRequest) => Promise<void>;
    deactivateTask: (id: number) => Promise<void>;

    // ========== ITEMS ==========
    getItems: () => Promise<void>;
    createItem: (payload: ICreateItemRequest) => Promise<void>;
    updateItem: (id: number, payload: IUpdateItemRequest) => Promise<void>;
    deleteItem: (id: number) => Promise<void>;
    getItemEffects: (itemId: number) => Promise<void>;
    createItemEffect: (itemId: number, payload: ICreateItemEffectRequest) => Promise<void>;
    updateItemEffect: (itemId: number, effectId: number, payload: IUpdateItemEffectRequest) => Promise<void>;
    deleteItemEffect: (itemId: number, effectId: number) => Promise<void>;

    // ========== ABILITIES ==========
    getAbilities: () => Promise<void>;
    createAbility: (payload: ICreateAbilityRequest) => Promise<void>;
    updateAbility: (id: number, payload: IUpdateAbilityRequest) => Promise<void>;
    deleteAbility: (id: number) => Promise<void>;

    // ========== SETTINGS ==========
    getContractSettings: () => Promise<void>;
    updateContractSettings: (contractType: string, payload: IUpdateContractSettingsRequest) => Promise<void>;
    getDebtSettings: () => Promise<void>;
    updateDebtSettings: (payload: IUpdateDebtSettingsRequest) => Promise<void>;

    // ========== MONITORING ==========
    getActiveContracts: () => Promise<void>;
    getDebts: () => Promise<void>;
    getBalanceTransactions: (limit?: number, playerId?: number) => Promise<void>;

    // ========== GOAL RACE ==========
    getGoalRaceTriggers: () => Promise<void>;
    createGoalRaceTrigger: (payload: ICreateGoalRaceTriggerRequest) => Promise<void>;
    updateGoalRaceTrigger: (id: number, payload: IUpdateGoalRaceTriggerRequest) => Promise<void>;
    deleteGoalRaceTrigger: (id: number) => Promise<void>;
    getPredefinedGoals: (triggerId: number) => Promise<void>;
    createPredefinedGoal: (triggerId: number, payload: ICreatePredefinedGoalRequest) => Promise<void>;
    createBatchPredefinedGoals: (payload: IBatchPredefinedGoalsRequest) => Promise<void>;
    deletePredefinedGoal: (triggerId: number, goalId: number) => Promise<void>;
    getGoalRaceHistory: (triggerId?: number, limit?: number) => Promise<void>;

    // ========== RELATIONS ==========
    getPlayerInventory: (playerId: number) => Promise<void>;
    addItemToPlayer: (playerId: number, payload: IAddItemToPlayerRequest) => Promise<void>;
    addBatchItemsToPlayer: (playerId: number, payload: IBatchItemsToPlayerRequest) => Promise<void>;
    removeItemFromPlayer: (playerId: number, itemId: number) => Promise<void>;
    getGoalDependencies: (goalId: number) => Promise<void>;
    addGoalDependency: (goalId: number, payload: ICreateGoalDependencyRequest) => Promise<void>;
    deleteGoalDependency: (goalId: number, dependencyId: number) => Promise<void>;
    getPlayerInfo: (playerId: number) => Promise<void>;
    createPlayerInfo: (playerId: number, payload: ICreatePlayerInfoRequest) => Promise<void>;
    updatePlayerInfo: (playerId: number, payload: IUpdatePlayerInfoRequest) => Promise<void>;
    deletePlayerInfo: (playerId: number) => Promise<void>;
    getTriggerParticipants: (triggerId: number) => Promise<void>;
    addTriggerParticipant: (triggerId: number, payload: IAddTriggerParticipantRequest) => Promise<void>;
    addBatchTriggerParticipants: (triggerId: number, payload: IBatchTriggerParticipantsRequest) => Promise<void>;
    removeTriggerParticipant: (triggerId: number, playerId: number) => Promise<void>;
    getAbilityUsageHistory: (limit?: number, playerId?: number, abilityId?: number) => Promise<void>;
    getPlayerRevealedInfo: (playerId: number) => Promise<void>;
}

export const createAdminSlice: ImmerSlice<AdminStore> = (set, get) => ({
    // Initial state
    gameStatus: null,
    factions: [],
    players: [],
    goals: [],
    tasks: [],
    taskBlocks: [],
    items: [],
    itemEffects: [],
    abilities: [],
    contractSettings: [],
    debtSettings: null,
    activeContracts: [],
    debts: [],
    balanceTransactions: [],
    goalRaceTriggers: [],
    predefinedGoals: [],
    goalRaceHistory: [],
    playerInventoryItems: [],
    goalDependencies: [],
    playerInfo: null,
    triggerParticipants: [],
    abilityUsageHistory: [],
    revealedInfos: [],
    isLoading: false,
    isLoadingPlayers: false,
    isLoadingFactions: false,
    isLoadingGoals: false,
    isLoadingTasks: false,
    isLoadingItems: false,

    // ========== GAME MANAGEMENT ==========
    getGameStatus: async () => {
        try {
            const response = await AdminService.getGameStatus();
            set((state) => {
                state.admin.gameStatus = response.data;
            });
        } catch {
            toast.error('Ошибка загрузки статуса игры');
        }
    },

    startGame: async (payload) => {
        try {
            await AdminService.startGame(payload);
            toast.success('Игра успешно начата!');
            await get().admin.getGameStatus();
        } catch {
            toast.error('Ошибка начала игры');
        }
    },

    pauseGame: async () => {
        try {
            await AdminService.pauseGame();
            toast.success('Игра поставлена на паузу');
            await get().admin.getGameStatus();
        } catch {
            toast.error('Ошибка постановки игры на паузу');
        }
    },

    finishGame: async () => {
        try {
            await AdminService.finishGame();
            toast.success('Игра завершена');
            await get().admin.getGameStatus();
        } catch {
            toast.error('Ошибка завершения игры');
        }
    },

    // ========== FACTIONS ==========
    getFactions: async () => {
        set((state) => { state.admin.isLoadingFactions = true; });
        try {
            const response = await AdminService.getFactions();
            set((state) => {
                state.admin.factions = factionsMapper(response.data.factions);
                state.admin.isLoadingFactions = false;
            });
        } catch {
            set((state) => { state.admin.isLoadingFactions = false; });
            toast.error('Ошибка загрузки фракций');
        }
    },

    createFaction: async (payload) => {
        try {
            await AdminService.createFaction(payload);
            toast.success('Фракция создана!');
            await get().admin.getFactions();
        } catch {
            toast.error('Ошибка создания фракции');
        }
    },

    updateFaction: async (id, payload) => {
        try {
            await AdminService.updateFaction(id, payload);
            toast.success('Фракция обновлена!');
            await get().admin.getFactions();
        } catch {
            toast.error('Ошибка обновления фракции');
        }
    },

    deleteFaction: async (id) => {
        try {
            await AdminService.deleteFaction(id);
            toast.success('Фракция удалена!');
            await get().admin.getFactions();
        } catch {
            toast.error('Ошибка удаления фракции');
        }
    },

    // ========== PLAYERS ==========
    getPlayers: async () => {
        set((state) => { state.admin.isLoadingPlayers = true; });
        try {
            const response = await AdminService.getPlayers();
            set((state) => {
                state.admin.players = playersMapper(response.data.players);
                state.admin.isLoadingPlayers = false;
            });
        } catch {
            set((state) => { state.admin.isLoadingPlayers = false; });
            toast.error('Ошибка загрузки игроков');
        }
    },

    createPlayer: async (payload) => {
        try {
            await AdminService.createPlayer(payload);
            toast.success('Игрок создан!');
            await get().admin.getPlayers();
        } catch {
            toast.error('Ошибка создания игрока');
        }
    },

    updatePlayer: async (id, payload) => {
        try {
            await AdminService.updatePlayer(id, payload);
            toast.success('Игрок обновлен!');
            await get().admin.getPlayers();
        } catch {
            toast.error('Ошибка обновления игрока');
        }
    },

    deletePlayer: async (id) => {
        try {
            await AdminService.deletePlayer(id);
            toast.success('Игрок удален!');
            await get().admin.getPlayers();
        } catch {
            toast.error('Ошибка удаления игрока');
        }
    },

    updatePlayerBalance: async (id, payload) => {
        try {
            await AdminService.updatePlayerBalance(id, payload);
            toast.success('Баланс обновлен!');
            await get().admin.getPlayers();
        } catch {
            toast.error('Ошибка обновления баланса');
        }
    },

    updatePlayerInfluence: async (id, payload) => {
        try {
            await AdminService.updatePlayerInfluence(id, payload);
            toast.success('Очки влияния обновлены!');
            await get().admin.getPlayers();
        } catch {
            toast.error('Ошибка обновления очков влияния');
        }
    },

    // ========== GOALS ==========
    getGoals: async () => {
        set((state) => { state.admin.isLoadingGoals = true; });
        try {
            const response = await AdminService.getGoals();
            set((state) => {
                state.admin.goals = goalsMapper(response.data.goals);
                state.admin.isLoadingGoals = false;
            });
        } catch {
            set((state) => { state.admin.isLoadingGoals = false; });
            toast.error('Ошибка загрузки целей');
        }
    },

    createGoal: async (payload) => {
        try {
            await AdminService.createGoal(payload);
            toast.success('Цель создана!');
            await get().admin.getGoals();
        } catch {
            toast.error('Ошибка создания цели');
        }
    },

    updateGoal: async (id, payload) => {
        try {
            await AdminService.updateGoal(id, payload);
            toast.success('Цель обновлена!');
            await get().admin.getGoals();
        } catch {
            toast.error('Ошибка обновления цели');
        }
    },

    deleteGoal: async (id) => {
        try {
            await AdminService.deleteGoal(id);
            toast.success('Цель удалена!');
            await get().admin.getGoals();
        } catch {
            toast.error('Ошибка удаления цели');
        }
    },

    completeGoal: async (id, payload) => {
        try {
            await AdminService.completeGoal(id, payload);
            toast.success('Цель отмечена как выполненная!');
            await get().admin.getGoals();
        } catch {
            toast.error('Ошибка выполнения цели');
        }
    },

    // ========== TASKS ==========
    getTaskBlocks: async () => {
        try {
            const response = await AdminService.getTaskBlocks();
            set((state) => {
                state.admin.taskBlocks = taskBlocksMapper(response.data.task_blocks);
            });
        } catch {
            toast.error('Ошибка загрузки блоков задач');
        }
    },

    createTaskBlock: async (payload) => {
        try {
            await AdminService.createTaskBlock(payload);
            toast.success('Блок задач создан!');
            await get().admin.getTaskBlocks();
        } catch {
            toast.error('Ошибка создания блока задач');
        }
    },

    updateTaskBlock: async (id, payload) => {
        try {
            await AdminService.updateTaskBlock(id, payload);
            toast.success('Блок задач обновлен!');
            await get().admin.getTaskBlocks();
        } catch {
            toast.error('Ошибка обновления блока задач');
        }
    },

    deleteTaskBlock: async (id) => {
        try {
            await AdminService.deleteTaskBlock(id);
            toast.success('Блок задач удален!');
            await get().admin.getTaskBlocks();
        } catch {
            toast.error('Ошибка удаления блока задач');
        }
    },

    getTasks: async () => {
        set((state) => { state.admin.isLoadingTasks = true; });
        try {
            const response = await AdminService.getTasks();
            set((state) => {
                state.admin.tasks = tasksMapper(response.data.tasks);
                state.admin.isLoadingTasks = false;
            });
        } catch {
            set((state) => { state.admin.isLoadingTasks = false; });
            toast.error('Ошибка загрузки задач');
        }
    },

    createTask: async (payload) => {
        try {
            await AdminService.createTask(payload);
            toast.success('Задача создана!');
            await get().admin.getTasks();
        } catch {
            toast.error('Ошибка создания задачи');
        }
    },

    updateTask: async (id, payload) => {
        try {
            await AdminService.updateTask(id, payload);
            toast.success('Задача обновлена!');
            await get().admin.getTasks();
        } catch {
            toast.error('Ошибка обновления задачи');
        }
    },

    deleteTask: async (id) => {
        try {
            await AdminService.deleteTask(id);
            toast.success('Задача удалена!');
            await get().admin.getTasks();
        } catch {
            toast.error('Ошибка удаления задачи');
        }
    },

    activateTask: async (id, payload) => {
        try {
            await AdminService.activateTask(id, payload);
            toast.success('Задача активирована для игроков!');
            await get().admin.getTasks();
        } catch {
            toast.error('Ошибка активации задачи');
        }
    },

    deactivateTask: async (id) => {
        try {
            await AdminService.deactivateTask(id);
            toast.success('Задача деактивирована!');
            await get().admin.getTasks();
        } catch {
            toast.error('Ошибка деактивации задачи');
        }
    },

    // ========== ITEMS ==========
    getItems: async () => {
        set((state) => { state.admin.isLoadingItems = true; });
        try {
            const response = await AdminService.getItems();
            set((state) => {
                state.admin.items = itemsMapper(response.data.items);
                state.admin.isLoadingItems = false;
            });
        } catch {
            set((state) => { state.admin.isLoadingItems = false; });
            toast.error('Ошибка загрузки предметов');
        }
    },

    createItem: async (payload) => {
        try {
            await AdminService.createItem(payload);
            toast.success('Предмет создан!');
            await get().admin.getItems();
        } catch {
            toast.error('Ошибка создания предмета');
        }
    },

    updateItem: async (id, payload) => {
        try {
            await AdminService.updateItem(id, payload);
            toast.success('Предмет обновлен!');
            await get().admin.getItems();
        } catch {
            toast.error('Ошибка обновления предмета');
        }
    },

    deleteItem: async (id) => {
        try {
            await AdminService.deleteItem(id);
            toast.success('Предмет удален!');
            await get().admin.getItems();
        } catch {
            toast.error('Ошибка удаления предмета');
        }
    },

    getItemEffects: async (itemId) => {
        try {
            const response = await AdminService.getItemEffects(itemId);
            set((state) => {
                state.admin.itemEffects = itemEffectsMapper(response.data.effects);
            });
        } catch {
            toast.error('Ошибка загрузки эффектов предмета');
        }
    },

    createItemEffect: async (itemId, payload) => {
        try {
            await AdminService.createItemEffect(itemId, payload);
            toast.success('Эффект создан!');
            await get().admin.getItemEffects(itemId);
        } catch {
            toast.error('Ошибка создания эффекта');
        }
    },

    updateItemEffect: async (itemId, effectId, payload) => {
        try {
            await AdminService.updateItemEffect(itemId, effectId, payload);
            toast.success('Эффект обновлен!');
            await get().admin.getItemEffects(itemId);
        } catch {
            toast.error('Ошибка обновления эффекта');
        }
    },

    deleteItemEffect: async (itemId, effectId) => {
        try {
            await AdminService.deleteItemEffect(itemId, effectId);
            toast.success('Эффект удален!');
            await get().admin.getItemEffects(itemId);
        } catch {
            toast.error('Ошибка удаления эффекта');
        }
    },

    // ========== ABILITIES ==========
    getAbilities: async () => {
        try {
            const response = await AdminService.getAbilities();
            set((state) => {
                state.admin.abilities = abilitiesMapper(response.data.abilities);
            });
        } catch {
            toast.error('Ошибка загрузки способностей');
        }
    },

    createAbility: async (payload) => {
        try {
            await AdminService.createAbility(payload);
            toast.success('Способность создана!');
            await get().admin.getAbilities();
        } catch {
            toast.error('Ошибка создания способности');
        }
    },

    updateAbility: async (id, payload) => {
        try {
            await AdminService.updateAbility(id, payload);
            toast.success('Способность обновлена!');
            await get().admin.getAbilities();
        } catch {
            toast.error('Ошибка обновления способности');
        }
    },

    deleteAbility: async (id) => {
        try {
            await AdminService.deleteAbility(id);
            toast.success('Способность удалена!');
            await get().admin.getAbilities();
        } catch {
            toast.error('Ошибка удаления способности');
        }
    },

    // ========== SETTINGS ==========
    getContractSettings: async () => {
        try {
            const response = await AdminService.getContractSettings();
            set((state) => {
                state.admin.contractSettings = contractSettingsListMapper(response.data.settings);
            });
        } catch {
            toast.error('Ошибка загрузки настроек контрактов');
        }
    },

    updateContractSettings: async (contractType, payload) => {
        try {
            await AdminService.updateContractSettings(contractType, payload);
            toast.success('Настройки контракта обновлены!');
            await get().admin.getContractSettings();
        } catch {
            toast.error('Ошибка обновления настроек контракта');
        }
    },

    getDebtSettings: async () => {
        try {
            const response = await AdminService.getDebtSettings();
            set((state) => {
                state.admin.debtSettings = debtSettingsMapper(response.data);
            });
        } catch {
            toast.error('Ошибка загрузки настроек долгов');
        }
    },

    updateDebtSettings: async (payload) => {
        try {
            await AdminService.updateDebtSettings(payload);
            toast.success('Настройки долгов обновлены!');
            await get().admin.getDebtSettings();
        } catch {
            toast.error('Ошибка обновления настроек долгов');
        }
    },

    // ========== MONITORING ==========
    getActiveContracts: async () => {
        try {
            const response = await AdminService.getActiveContracts();
            set((state) => {
                state.admin.activeContracts = activeContractsMapper(response.data.contracts);
            });
        } catch {
            toast.error('Ошибка загрузки активных контрактов');
        }
    },

    getDebts: async () => {
        try {
            const response = await AdminService.getDebts();
            set((state) => {
                state.admin.debts = debtsMapper(response.data.debts);
            });
        } catch {
            toast.error('Ошибка загрузки долгов');
        }
    },

    getBalanceTransactions: async (limit, playerId) => {
        try {
            const response = await AdminService.getBalanceTransactions({ limit, player_id: playerId });
            set((state) => {
                state.admin.balanceTransactions = balanceTransactionsMapper(response.data.transactions);
            });
        } catch {
            toast.error('Ошибка загрузки транзакций');
        }
    },

    // ========== GOAL RACE ==========
    getGoalRaceTriggers: async () => {
        try {
            const response = await AdminService.getGoalRaceTriggers();
            set((state) => {
                state.admin.goalRaceTriggers = goalRaceTriggersMapper(response.data.triggers);
            });
        } catch {
            toast.error('Ошибка загрузки триггеров гонки целей');
        }
    },

    createGoalRaceTrigger: async (payload) => {
        try {
            await AdminService.createGoalRaceTrigger(payload);
            toast.success('Триггер создан!');
            await get().admin.getGoalRaceTriggers();
        } catch {
            toast.error('Ошибка создания триггера');
        }
    },

    updateGoalRaceTrigger: async (id, payload) => {
        try {
            await AdminService.updateGoalRaceTrigger(id, payload);
            toast.success('Триггер обновлен!');
            await get().admin.getGoalRaceTriggers();
        } catch {
            toast.error('Ошибка обновления триггера');
        }
    },

    deleteGoalRaceTrigger: async (id) => {
        try {
            await AdminService.deleteGoalRaceTrigger(id);
            toast.success('Триггер удален!');
            await get().admin.getGoalRaceTriggers();
        } catch {
            toast.error('Ошибка удаления триггера');
        }
    },

    getPredefinedGoals: async (triggerId) => {
        try {
            const response = await AdminService.getPredefinedGoals(triggerId);
            set((state) => {
                state.admin.predefinedGoals = predefinedGoalsMapper(response.data.goals);
            });
        } catch {
            toast.error('Ошибка загрузки предопределенных целей');
        }
    },

    createPredefinedGoal: async (triggerId, payload) => {
        try {
            await AdminService.createPredefinedGoal(triggerId, payload);
            toast.success('Предопределенная цель создана!');
            await get().admin.getPredefinedGoals(triggerId);
        } catch {
            toast.error('Ошибка создания предопределенной цели');
        }
    },

    createBatchPredefinedGoals: async (payload) => {
        try {
            await AdminService.createBatchPredefinedGoals(payload);
            toast.success('Предопределенные цели созданы!');
            await get().admin.getPredefinedGoals(payload.trigger_id);
        } catch {
            toast.error('Ошибка массового создания целей');
        }
    },

    deletePredefinedGoal: async (triggerId, goalId) => {
        try {
            await AdminService.deletePredefinedGoal(triggerId, goalId);
            toast.success('Предопределенная цель удалена!');
            await get().admin.getPredefinedGoals(triggerId);
        } catch {
            toast.error('Ошибка удаления предопределенной цели');
        }
    },

    getGoalRaceHistory: async (triggerId, limit) => {
        try {
            const response = await AdminService.getGoalRaceHistory({ trigger_id: triggerId, limit });
            set((state) => {
                state.admin.goalRaceHistory = goalRaceHistoriesMapper(response.data.history);
            });
        } catch {
            toast.error('Ошибка загрузки истории гонки целей');
        }
    },

    // ========== RELATIONS ==========
    getPlayerInventory: async (playerId) => {
        try {
            const response = await AdminService.getPlayerInventory(playerId);
            set((state) => {
                state.admin.playerInventoryItems = playerInventoryItemsMapper(response.data.items);
            });
        } catch {
            toast.error('Ошибка загрузки инвентаря игрока');
        }
    },

    addItemToPlayer: async (playerId, payload) => {
        try {
            await AdminService.addItemToPlayer(playerId, payload);
            toast.success('Предмет добавлен в инвентарь!');
            await get().admin.getPlayerInventory(playerId);
        } catch {
            toast.error('Ошибка добавления предмета');
        }
    },

    addBatchItemsToPlayer: async (playerId, payload) => {
        try {
            await AdminService.addBatchItemsToPlayer(playerId, payload);
            toast.success('Предметы добавлены в инвентарь!');
            await get().admin.getPlayerInventory(playerId);
        } catch {
            toast.error('Ошибка массового добавления предметов');
        }
    },

    removeItemFromPlayer: async (playerId, itemId) => {
        try {
            await AdminService.removeItemFromPlayer(playerId, itemId);
            toast.success('Предмет удален из инвентаря!');
            await get().admin.getPlayerInventory(playerId);
        } catch {
            toast.error('Ошибка удаления предмета');
        }
    },

    getGoalDependencies: async (goalId) => {
        try {
            const response = await AdminService.getGoalDependencies(goalId);
            set((state) => {
                state.admin.goalDependencies = goalDependenciesMapper(response.data.dependencies);
            });
        } catch {
            toast.error('Ошибка загрузки зависимостей цели');
        }
    },

    addGoalDependency: async (goalId, payload) => {
        try {
            await AdminService.addGoalDependency(goalId, payload);
            toast.success('Зависимость добавлена!');
            await get().admin.getGoalDependencies(goalId);
        } catch {
            toast.error('Ошибка добавления зависимости');
        }
    },

    deleteGoalDependency: async (goalId, dependencyId) => {
        try {
            await AdminService.deleteGoalDependency(goalId, dependencyId);
            toast.success('Зависимость удалена!');
            await get().admin.getGoalDependencies(goalId);
        } catch {
            toast.error('Ошибка удаления зависимости');
        }
    },

    getPlayerInfo: async (playerId) => {
        try {
            const response = await AdminService.getPlayerInfo(playerId);
            set((state) => {
                state.admin.playerInfo = playerInfoMapper(response.data);
            });
        } catch {
            set((state) => {
                state.admin.playerInfo = null;
            });
        }
    },

    createPlayerInfo: async (playerId, payload) => {
        try {
            await AdminService.createPlayerInfo(playerId, payload);
            toast.success('Информация о игроке создана!');
            await get().admin.getPlayerInfo(playerId);
        } catch {
            toast.error('Ошибка создания информации');
        }
    },

    updatePlayerInfo: async (playerId, payload) => {
        try {
            await AdminService.updatePlayerInfo(playerId, payload);
            toast.success('Информация о игроке обновлена!');
            await get().admin.getPlayerInfo(playerId);
        } catch {
            toast.error('Ошибка обновления информации');
        }
    },

    deletePlayerInfo: async (playerId) => {
        try {
            await AdminService.deletePlayerInfo(playerId);
            toast.success('Информация о игроке удалена!');
            set((state) => {
                state.admin.playerInfo = null;
            });
        } catch {
            toast.error('Ошибка удаления информации');
        }
    },

    getTriggerParticipants: async (triggerId) => {
        try {
            const response = await AdminService.getTriggerParticipants(triggerId);
            set((state) => {
                state.admin.triggerParticipants = triggerParticipantsMapper(response.data.participants);
            });
        } catch {
            toast.error('Ошибка загрузки участников триггера');
        }
    },

    addTriggerParticipant: async (triggerId, payload) => {
        try {
            await AdminService.addTriggerParticipant(triggerId, payload);
            toast.success('Участник добавлен!');
            await get().admin.getTriggerParticipants(triggerId);
        } catch {
            toast.error('Ошибка добавления участника');
        }
    },

    addBatchTriggerParticipants: async (triggerId, payload) => {
        try {
            await AdminService.addBatchTriggerParticipants(triggerId, payload);
            toast.success('Участники добавлены!');
            await get().admin.getTriggerParticipants(triggerId);
        } catch {
            toast.error('Ошибка массового добавления участников');
        }
    },

    removeTriggerParticipant: async (triggerId, playerId) => {
        try {
            await AdminService.removeTriggerParticipant(triggerId, playerId);
            toast.success('Участник удален!');
            await get().admin.getTriggerParticipants(triggerId);
        } catch {
            toast.error('Ошибка удаления участника');
        }
    },

    getAbilityUsageHistory: async (limit, playerId, abilityId) => {
        try {
            const response = await AdminService.getAbilityUsageHistory({ limit, player_id: playerId, ability_id: abilityId });
            set((state) => {
                state.admin.abilityUsageHistory = abilityUsageHistoriesMapper(response.data.usage_history);
            });
        } catch {
            toast.error('Ошибка загрузки истории использования способностей');
        }
    },

    getPlayerRevealedInfo: async (playerId) => {
        try {
            const response = await AdminService.getPlayerRevealedInfo(playerId);
            set((state) => {
                state.admin.revealedInfos = revealedInfosMapper(response.data.revealed_info);
            });
        } catch {
            toast.error('Ошибка загрузки раскрытой информации');
        }
    },
});
