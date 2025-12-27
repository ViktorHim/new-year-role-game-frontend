import type { RevealInfoType } from './types';

export const INFO_CATEGORIES = [
    { value: 'faction' as RevealInfoType, label: 'Фракция', description: 'Узнать фракцию игрока' },
    { value: 'goal' as RevealInfoType, label: 'Цель', description: 'Узнать текущую цель игрока' },
    { value: 'item' as RevealInfoType, label: 'Предмет', description: 'Узнать предметы игрока' },
];
