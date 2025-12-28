import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Target, ListTodo } from 'lucide-react';
import { GoalsTab } from './tabs/goals-tab';
import { TasksTab } from './tabs/tasks-tab';

export const AdminGoalsTasks = () => {
    return (
        <Page>
            <Title tier={1} classname="mb-6">
                Цели и Задачи
            </Title>

            <Tabs defaultValue="goals" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                    <TabsTrigger value="goals" className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Цели
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="flex items-center gap-2">
                        <ListTodo className="w-4 h-4" />
                        Задачи
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="goals">
                    <GoalsTab />
                </TabsContent>

                <TabsContent value="tasks">
                    <TasksTab />
                </TabsContent>
            </Tabs>
        </Page>
    );
};
