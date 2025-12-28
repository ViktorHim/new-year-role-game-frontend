import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Separator } from '@/shared/ui/separator';
import { useState } from 'react';
import { ArrowLeft, Save, User, Shield, Briefcase, Coins, TrendingUp } from 'lucide-react';
import { Checkbox } from '@/shared/ui/checkbox';

const FACTIONS = [
    { value: 'mafia', label: 'Мафия' },
    { value: 'palace', label: 'Дворец' },
    { value: 'neutral', label: 'Нейтрал' },
];

const MOCK_GOALS = [
    { id: 1, description: 'Заключить 3 контракта', isCompleted: false },
    { id: 2, description: 'Накопить 10000 монет', isCompleted: true },
    { id: 3, description: 'Получить 200 ОВ', isCompleted: false },
];

const MOCK_TASKS = [
    { id: 1, description: 'Провести встречу с игроком', isCompleted: true },
    { id: 2, description: 'Собрать информацию', isCompleted: false },
];

const MOCK_ITEMS = [
    { id: 1, name: 'Контрабандный товар', description: 'Ценный груз' },
    { id: 2, name: 'Документы', description: 'Важные бумаги' },
];

interface EditPlayerPageProps {
    playerId: number;
    onBack: () => void;
}

export const EditPlayerPage = ({ playerId, onBack }: EditPlayerPageProps) => {
    const [name, setName] = useState('Иван Петров');
    const [faction, setFaction] = useState('mafia');
    const [role, setRole] = useState('Контрабандист');
    const [influence, setInfluence] = useState('150');
    const [balance, setBalance] = useState('5000');
    const [goals, setGoals] = useState(MOCK_GOALS);
    const [tasks, setTasks] = useState(MOCK_TASKS);
    const [items] = useState(MOCK_ITEMS);

    const handleSave = () => {
        console.log('Saving player...', {
            name,
            faction,
            role,
            influence,
            balance,
            goals,
            tasks,
        });
    };

    const toggleGoal = (id: number) => {
        setGoals(goals.map((g) => (g.id === id ? { ...g, isCompleted: !g.isCompleted } : g)));
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
    };

    return (
        <Page>
            <div className="mb-6">
                <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                    Назад к списку
                </Button>
                <div className="flex justify-between items-center">
                    <Title tier={1}>Редактирование игрока #{playerId}</Title>
                    <Button onClick={handleSave} className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Сохранить
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Основная информация */}
                <Card>
                    <CardHeader>
                        <CardTitle>Основная информация</CardTitle>
                        <CardDescription>Базовые данные игрока</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Имя
                                </Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    Роль
                                </Label>
                                <Input value={role} onChange={(e) => setRole(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Фракция
                                </Label>
                                <Select value={faction} onValueChange={setFaction}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FACTIONS.map((f) => (
                                            <SelectItem key={f.value} value={f.value}>
                                                {f.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Очки влияния (ОВ)
                                </Label>
                                <Input
                                    type="number"
                                    value={influence}
                                    onChange={(e) => setInfluence(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Coins className="w-4 h-4" />
                                    Баланс
                                </Label>
                                <Input
                                    type="number"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Цели */}
                <Card>
                    <CardHeader>
                        <CardTitle>Цели (Goals)</CardTitle>
                        <CardDescription>Управление целями игрока</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {goals.map((goal) => (
                                <div
                                    key={goal.id}
                                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50"
                                >
                                    <Checkbox
                                        checked={goal.isCompleted}
                                        onCheckedChange={() => toggleGoal(goal.id)}
                                        className="mt-0.5"
                                    />
                                    <div className="flex-1">
                                        <p
                                            className={`text-sm ${goal.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}
                                        >
                                            {goal.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Задачи */}
                <Card>
                    <CardHeader>
                        <CardTitle>Задачи (Tasks)</CardTitle>
                        <CardDescription>Управление задачами игрока</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50"
                                >
                                    <Checkbox
                                        checked={task.isCompleted}
                                        onCheckedChange={() => toggleTask(task.id)}
                                        className="mt-0.5"
                                    />
                                    <div className="flex-1">
                                        <p
                                            className={`text-sm ${task.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}
                                        >
                                            {task.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Предметы */}
                <Card>
                    <CardHeader>
                        <CardTitle>Предметы</CardTitle>
                        <CardDescription>Инвентарь игрока</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-3 border rounded-lg hover:bg-slate-50"
                                >
                                    <p className="font-medium text-slate-900">{item.name}</p>
                                    <p className="text-sm text-slate-500">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Page>
    );
};
