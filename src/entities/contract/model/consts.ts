import type { ContractType } from './types';

export const CONTRACT_TYPE_LABELS = {
    type1: 'Договор на провоз товара',
    type2: 'Договор с Фортуной',
};

export const CONTRACT_TYPES: { value: ContractType; label: string; description: string }[] = [
    {
        value: 'type1',
        label: 'Договор на провоз товара',
        description:
            'Заказчик получает предмет (зависит от фракции) и деньги. Исполнитель получает деньги.',
    },
    {
        value: 'type2',
        label: 'Договор с Фортуной',
        description: 'Исполнитель получает деньги и может раскрыть факт об одном из игроков.',
    },
];
