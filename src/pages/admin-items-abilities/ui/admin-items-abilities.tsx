import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Package, Zap } from 'lucide-react';
import { ItemsTab } from './tabs/items-tab';
import { AbilitiesTab } from './tabs/abilities-tab';

export const AdminItemsAbilities = () => {
    return (
        <Page>
            <Title tier={1} classname="mb-6">
                Предметы и Способности
            </Title>

            <Tabs defaultValue="items" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                    <TabsTrigger value="items" className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Предметы
                    </TabsTrigger>
                    <TabsTrigger value="abilities" className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Способности
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="items">
                    <ItemsTab />
                </TabsContent>

                <TabsContent value="abilities">
                    <AbilitiesTab />
                </TabsContent>
            </Tabs>
        </Page>
    );
};
