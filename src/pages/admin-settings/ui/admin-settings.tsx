import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { FileText, CreditCard, ArrowLeftRight, Trophy } from 'lucide-react';
import { ContractsTab } from './tabs/contracts-tab';
import { DebtsTab } from './tabs/debts-tab';
import { TransactionsTab } from './tabs/transactions-tab';
import { GoalRaceTab } from './tabs/goal-race-tab';

export const AdminSettings = () => {
    return (
        <Page>
            <Title tier={1} classname="mb-6">
                Настройки и Мониторинг
            </Title>

            <Tabs defaultValue="contracts" className="w-full">
                <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-6">
                    <TabsTrigger value="contracts" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Контракты
                    </TabsTrigger>
                    <TabsTrigger value="debts" className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Долги
                    </TabsTrigger>
                    <TabsTrigger value="transactions" className="flex items-center gap-2">
                        <ArrowLeftRight className="w-4 h-4" />
                        Транзакции
                    </TabsTrigger>
                    <TabsTrigger value="goalrace" className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Гонка целей
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="contracts">
                    <ContractsTab />
                </TabsContent>

                <TabsContent value="debts">
                    <DebtsTab />
                </TabsContent>

                <TabsContent value="transactions">
                    <TransactionsTab />
                </TabsContent>

                <TabsContent value="goalrace">
                    <GoalRaceTab />
                </TabsContent>
            </Tabs>
        </Page>
    );
};
