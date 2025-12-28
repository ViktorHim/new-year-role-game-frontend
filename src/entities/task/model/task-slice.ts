import type { ITask } from './types';
import { TaskService } from '../api/task-service';
import { tasksResponseMapper } from './mappers';
import type { ImmerSlice } from '@/app/store';

export interface TaskStore {
    tasks: ITask[];
    isLoading: boolean;

    getTasks: () => Promise<void>;
    toggleTask: (id: number, isCompleted: boolean) => Promise<void>;
}

export const createTaskSlice: ImmerSlice<TaskStore> = (set, get) => ({
    tasks: [],
    isLoading: false,

    getTasks: async () => {
        set((state) => {
            state.task.isLoading = true;
        });

        try {
            const response = await TaskService.getTasks();
            set((state) => {
                state.task.tasks = tasksResponseMapper(response.data?.tasks);
                state.task.isLoading = false;
            });
        } catch {
            set((state) => {
                state.task.isLoading = false;
            });
        }
    },

    toggleTask: async (id, isCompleted) => {
        const previousTasks = get().task.tasks;

        set((state) => {
            state.task.tasks = state.task.tasks.map((task) =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
            );
        });

        try {
            await TaskService.toggleTask(id, isCompleted);
            // Refetch goals after toggling task as it affects goals
            get().goals.getPersonalGoals();
        } catch {
            set((state) => {
                state.task.tasks = previousTasks;
            });
        }
    },
});
