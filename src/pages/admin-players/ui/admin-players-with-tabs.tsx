import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Users, Shield } from 'lucide-react';
import { PlayersTab } from './tabs/players-tab';
import { FactionsTab } from './tabs/factions-tab';

export const AdminPlayersWithTabs = () => {
    return (
        <Page>
            <Title tier={1} classname="mb-6">
                Игроки и Фракции
            </Title>

            <Tabs defaultValue="players" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                    <TabsTrigger value="players" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Игроки
                    </TabsTrigger>
                    <TabsTrigger value="factions" className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Фракции
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="players">
                    <PlayersTab />
                </TabsContent>

                <TabsContent value="factions">
                    <FactionsTab />
                </TabsContent>
            </Tabs>
        </Page>
    );
};
