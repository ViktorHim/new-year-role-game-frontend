import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { useEffect, useState } from 'react';
import { Loader2, ArrowLeftRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useAppStore } from '@/app/store';

export const TransactionsTab = () => {
    const { balanceTransactions, getBalanceTransactions } = useAppStore((state) => state.admin);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getBalanceTransactions(50);
    }, [getBalanceTransactions]);

    return (
        <div className="space-y-6">
            <div className="text-sm text-slate-600">
                Показано транзакций:{' '}
                <span className="font-semibold text-slate-900">{balanceTransactions.length}</span>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : (
                <div className="space-y-2">
                    {balanceTransactions.map((transaction) => (
                        <Card key={transaction.id}>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {transaction.amount > 0 ? (
                                            <TrendingUp className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <TrendingDown className="w-5 h-5 text-red-600" />
                                        )}
                                        <div>
                                            <div className="font-medium">{transaction.playerName}</div>
                                            <div className="text-sm text-slate-600">
                                                {transaction.description}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div
                                            className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}
                                        >
                                            {transaction.amount > 0 ? '+' : ''}
                                            {transaction.amount} ₽
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {transaction.createdAt.toLocaleString('ru-RU')}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {balanceTransactions.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            <ArrowLeftRight className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Нет транзакций</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
