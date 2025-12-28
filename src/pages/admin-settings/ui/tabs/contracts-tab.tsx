import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { useEffect, useState } from 'react';
import { Loader2, FileText } from 'lucide-react';
import { useAppStore } from '@/app/store';

export const ContractsTab = () => {
    const { activeContracts, getActiveContracts } = useAppStore((state) => state.admin);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getActiveContracts();
    }, [getActiveContracts]);

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-700',
            signed: 'bg-blue-100 text-blue-700',
            completed: 'bg-green-100 text-green-700',
            terminated: 'bg-red-100 text-red-700',
        };
        return colors[status] || 'bg-slate-100 text-slate-700';
    };

    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            pending: 'Ожидает',
            signed: 'Подписан',
            completed: 'Выполнен',
            terminated: 'Отменен',
        };
        return labels[status] || status;
    };

    return (
        <div className="space-y-6">
            <div className="text-sm text-slate-600">
                Всего активных контрактов:{' '}
                <span className="font-semibold text-slate-900">{activeContracts.length}</span>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeContracts.map((contract) => (
                        <Card key={contract.id}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Контракт #{contract.id}
                                    </CardTitle>
                                    <Badge className={getStatusColor(contract.status)}>
                                        {getStatusLabel(contract.status)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div>
                                    <span className="text-slate-500">Заказчик:</span>{' '}
                                    <span className="font-medium">{contract.customerPlayerName}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500">Исполнитель:</span>{' '}
                                    <span className="font-medium">
                                        {contract.executorPlayerName || 'Не назначен'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500">Цена:</span>{' '}
                                    <span className="font-medium">{contract.price} ₽</span>
                                </div>
                                <div className="text-xs text-slate-500 pt-2 border-t">
                                    {contract.createdAt.toLocaleString('ru-RU')}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {activeContracts.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Нет активных контрактов</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
