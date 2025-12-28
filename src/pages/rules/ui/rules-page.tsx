import { STATIC } from '@/shared/config/static';
import { Page } from '@/shared/ui';
import { Title } from '@/shared/ui/title';
import { BanknotesIcon, StarIcon } from '@heroicons/react/16/solid';

const formatTextWithIcons = (text: string) => {
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let key = 0;

    // Регулярное выражение для поиска "денег", "деньги", "денежные средства"
    const moneyRegex = /(денег|деньги|денежные средства)/gi;
    // Регулярное выражение для поиска "ОВ"
    const ovRegex = /ОВ/g;

    // Собираем все совпадения и их позиции
    const matches: Array<{ index: number; length: number; type: 'money' | 'ov' }> = [];

    let match;
    while ((match = moneyRegex.exec(text)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'money' });
    }

    while ((match = ovRegex.exec(text)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'ov' });
    }

    // Сортируем совпадения по позиции
    matches.sort((a, b) => a.index - b.index);

    // Формируем массив частей текста с иконками
    matches.forEach((match) => {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        const matchedText = text.substring(match.index, match.index + match.length);

        if (match.type === 'money') {
            parts.push(
                <span key={key++} className="inline-flex items-center gap-1">
                    {matchedText}
                    <BanknotesIcon className="h-4 w-4 text-amber-600 inline" />
                </span>
            );
        } else {
            parts.push(
                <span key={key++} className="inline-flex items-center gap-1">
                    {matchedText}
                    <StarIcon className="h-4 w-4 text-purple-600 inline" />
                </span>
            );
        }

        lastIndex = match.index + match.length;
    });

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
};

export const RulesPage = () => {
    return (
        <Page>
            <div className="mb-6">
                <Title classname="mb-6">Правила</Title>
                <div className="space-y-6">
                    {STATIC.RULES.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">{section.title}</h2>
                            <ol className="space-y-3">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="text-slate-700 leading-relaxed">
                                        <span className="font-semibold text-slate-800 mr-2">
                                            {sectionIndex === 0 ? itemIndex + 1 : itemIndex + 11}.
                                        </span>
                                        {formatTextWithIcons(item)}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        </Page>
    );
};
