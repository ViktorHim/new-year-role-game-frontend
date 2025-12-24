import type { IFactionMember } from '@/entities/faction/model/types';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/table';
import { StarIcon } from '@heroicons/react/16/solid';
import { Crown } from 'lucide-react';
import { ProfileAvatar } from '@widgets/profile-avatar';
import { Title } from '@/shared/ui/title';

interface FactionTableProps {
    factionName: string;
    totalInfluence: number;
    members: IFactionMember[];
    currentPlayerId?: number;
    leaderPlayerId?: number;
    className?: string;
}

export const FactionTable = ({
    factionName,
    totalInfluence,
    members,
    currentPlayerId,
    leaderPlayerId,
    className = '',
}: FactionTableProps) => {
    return (
        <div className={className}>
            <div className="bg-white rounded-t-xl border border-b-0 border-slate-200 px-4 py-3">
                <Title tier={3}>{factionName}</Title>
            </div>
            <div className="bg-white border border-slate-200 overflow-hidden">
                <Table>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow
                                key={member.id}
                                className={`${
                                    member.id === currentPlayerId
                                        ? 'bg-green-50 hover:bg-green-100'
                                        : 'hover:bg-slate-50'
                                }`}
                            >
                                <TableCell className="py-3">
                                    <div className="relative">
                                        <ProfileAvatar
                                            fallbackText={member.character_name[0]}
                                            size="sm"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900 flex gap-1">
                                            {member.character_name}
                                            {member.id === leaderPlayerId && (
                                                <Crown className="text-amber-500 fill-amber-400 h-5 w-5" />
                                            )}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {member.role}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <span className="font-semibold text-purple-600">
                                            {member.influence}
                                        </span>
                                        <StarIcon className="h-4 w-4 text-purple-600" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Итоговая строка */}
            <div className="bg-purple-50 rounded-b-xl border border-t-0 border-slate-200 px-4 py-3 flex items-center justify-between">
                <span className="font-medium text-slate-700">Суммарное влияние</span>
                <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-purple-600">{totalInfluence}</span>
                    <StarIcon className="h-5 w-5 text-purple-600" />
                </div>
            </div>
        </div>
    );
};
