import {
    ContractCard,
    CreateContractCard,
    CreateContractModal,
    SignContractModal,
    RevealInfoModal,
    ContractResultModal,
    type ICreateContractRequest,
    type IReceivedContract,
    type RevealInfoType,
    type IRevealedFaction,
    type IRevealedGoal,
    type IRevealedItem,
} from '@/entities/contract';
import { useContract } from '@/entities/contract/store';
import { Title } from '@/shared/ui/title';
import { useEffect, useState, useMemo } from 'react';

export const ContractsSection = () => {
    const {
        myContracts,
        receivedContracts,
        terminatedContracts,
        isLoading,
        getContracts,
        createContract,
        signContract,
        revealContract,
    } = useContract();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [contractToSign, setContractToSign] = useState<IReceivedContract | null>(null);
    const [contractToReveal, setContractToReveal] = useState<number | null>(null);
    const [revealedInfo, setRevealedInfo] = useState<{
        infoType: RevealInfoType;
        factionData?: IRevealedFaction;
        goalData?: IRevealedGoal;
        itemData?: IRevealedItem;
    } | null>(null);

    useEffect(() => {
        getContracts();
    }, [getContracts]);

    const handleCreateContract = async (payload: ICreateContractRequest) => {
        await createContract(payload);
    };

    const handleSignContract = async (contractId: number) => {
        await signContract(contractId);
        setContractToSign(null);
    };

    const handleRevealInfo = async (contractId: number, infoCategory: RevealInfoType) => {
        try {
            const response = await revealContract(contractId, infoCategory);
            setContractToReveal(null);

            // Show result modal with revealed info
            const { info_type, data } = response.revealed_info;

            if (info_type === 'faction') {
                setRevealedInfo({
                    infoType: info_type,
                    factionData: data as IRevealedFaction,
                });
            } else if (info_type === 'goal') {
                setRevealedInfo({
                    infoType: info_type,
                    goalData: data as IRevealedGoal,
                });
            } else if (info_type === 'item') {
                setRevealedInfo({
                    infoType: info_type,
                    itemData: data as IRevealedItem,
                });
            }
        } catch (error) {
            setContractToReveal(null);
        }
    };

    const handleResultModalClose = () => {
        setRevealedInfo(null);
        // Refresh contracts after closing result modal
        getContracts();
    };

    // Count active contracts by type
    const activeContractCounts = useMemo(() => {
        const allActiveContracts = [...myContracts, ...receivedContracts].filter(
            (contract) => contract.status === 'pending' || contract.status === 'signed'
        );

        return {
            type1: allActiveContracts.filter((c) => c.contractType === 'type1').length,
            type2: allActiveContracts.filter((c) => c.contractType === 'type2').length,
        };
    }, [myContracts, receivedContracts]);

    const canCreateContract = activeContractCounts.type1 < 3 || activeContractCounts.type2 < 3;

    if (isLoading && myContracts.length === 0 && receivedContracts.length === 0) {
        return <div>Загрузка договоров...</div>;
    }

    return (
        <>
            <Title tier={2} classname="mb-2">
                Договоры
            </Title>
            <div className="space-y-3">
                {canCreateContract && (
                    <CreateContractCard onClick={() => setIsCreateModalOpen(true)} />
                )}

                {myContracts.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 mb-3"></h2>
                        <div className="space-y-3">
                            {myContracts.map((contract) => (
                                <ContractCard
                                    key={contract.id}
                                    contract={contract}
                                    onRevealInfo={setContractToReveal}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {receivedContracts.length > 0 && (
                    <div>
                        <div className="space-y-3">
                            {receivedContracts.map((contract) => (
                                <ContractCard
                                    key={contract.id}
                                    contract={contract}
                                    onSign={() => {
                                        setContractToSign(contract);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {terminatedContracts.length > 0 && (
                    <div>
                        <div className="space-y-3">
                            {terminatedContracts.map((contract) => (
                                <ContractCard
                                    key={contract.id}
                                    contract={contract}
                                    onRevealInfo={setContractToReveal}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <CreateContractModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateContract}
                isLoading={isLoading}
                activeContractCounts={activeContractCounts}
            />

            <SignContractModal
                contract={contractToSign}
                isOpen={!!contractToSign}
                onClose={() => setContractToSign(null)}
                onConfirm={handleSignContract}
                isLoading={isLoading}
                activeContractCounts={activeContractCounts}
            />

            <RevealInfoModal
                contractId={contractToReveal}
                isOpen={!!contractToReveal}
                onClose={() => setContractToReveal(null)}
                onConfirm={handleRevealInfo}
                isLoading={isLoading}
            />

            <ContractResultModal
                isOpen={!!revealedInfo}
                onClose={handleResultModalClose}
                infoType={revealedInfo?.infoType || null}
                factionData={revealedInfo?.factionData}
                goalData={revealedInfo?.goalData}
                itemData={revealedInfo?.itemData}
            />
        </>
    );
};
