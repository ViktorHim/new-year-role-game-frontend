import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useEffect, useState } from 'react';
import { Loader2, CreditCard } from 'lucide-react';
import { useAppStore } from '@/app/store';

export const DebtsTab = () => {
    const { debts, getDebts } = useAppStore((state) => state.admin);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getDebts();
    }, [getDebts]);

    return (
        <div className="space-y-6">
            <div className="text-sm text-slate-600">
                Всего долгов: <span className="font-semibold text-slate-900">{debts.length}</span>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {debts.map((debt) => (
                        <Card key={debt.id} className="border-red-200">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-red-600" />
                                    {debt.debtorPlayerName}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Текущий долг:</span>
                                    <span className="font-semibold text-red-600">
                                        {debt.currentAmount} ₽
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Макс. долг:</span>
                                    <span className="font-medium">{debt.maxAmount} ₽</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Процент:</span>
                                    <span className="font-medium">{debt.interestRate}%</span>
                                </div>
                                <div className="text-xs text-slate-500 pt-2 border-t">
                                    Создан: {debt.createdAt.toLocaleDateString('ru-RU')}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {debts.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Нет долгов</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
