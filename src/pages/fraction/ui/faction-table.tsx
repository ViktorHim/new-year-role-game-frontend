import type { IFactionMember } from '@/entities/faction/model/types';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/table';
import { StarIcon } from '@heroicons/react/16/solid';
import { Crown } from 'lucide-react';
import { ProfileAvatar } from '@widgets/profile-avatar';
import { Title } from '@/shared/ui/title';

interface FactionTableProps {
    factionName: string;
    totalInfluence: number;
    factionInfluence: number;
    members: IFactionMember[];
    currentPlayerId?: number | null;
    leaderPlayerId?: number;
    className?: string;
    showStats?: boolean;
}

export const FactionTable = ({
    factionName,
    totalInfluence,
    factionInfluence,
    showStats = true,
    members,
    currentPlayerId,
    leaderPlayerId,
    className = '',
}: FactionTableProps) => {
    return (
        <div className={className}>
            <div className="bg-white rounded-t-xl border border-b-0 border-slate-200 px-4 py-3 flex items-center justify-between">
                <Title tier={3}>{factionName}</Title>
                {showStats ? (
                    <>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-rose-500">{factionInfluence}</span>
                                <StarIcon className="h-4 w-4 text-rose-500" />
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-purple-600">{totalInfluence}</span>
                                <StarIcon className="h-4 w-4 text-purple-600" />
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
            <div className="bg-white rounded-b-xl border border-slate-200 overflow-hidden">
                <Table>
                    <TableBody>
                        {members && members.length ? (
                            members?.map((member) => (
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
                                                fallbackText={member.name[0]}
                                                size="sm"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900 flex gap-1">
                                                {member.name}
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
                                        {showStats ? (
                                            <div className="flex items-center justify-end gap-1">
                                                <span className="font-semibold text-purple-600">
                                                    {member.influence}
                                                </span>
                                                <StarIcon className="h-4 w-4 text-purple-600" />
                                            </div>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="hover:bg-slate-50">
                                <TableCell colSpan={3} className="py-4 text-center">
                                    <span className="text-base font-medium text-slate-500">
                                        Нет информации о составе фракции
                                    </span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
