import {
    ContractCard,
    CreateContractCard,
    CreateContractModal,
    SignContractModal,
    type ICreateContractRequest,
    type IReceivedContract,
} from '@/entities/contract';
import { useContract } from '@/entities/contract/store';
import { Title } from '@/shared/ui/title';
import { useEffect, useState } from 'react';

export const ContractsSection = () => {
    const {
        myContracts,
        receivedContracts,
        terminatedContracts,
        isLoading,
        getContracts,
        createContract,
        signContract,
    } = useContract();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [contractToSign, setContractToSign] = useState<IReceivedContract | null>(null);

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

    const handleClaimReward = (contractId: number) => {
        // TODO: Реализовать выбор категории информации
        console.log('Claim reward for contract:', contractId);
    };

    if (isLoading && myContracts.length === 0 && receivedContracts.length === 0) {
        return <div>Загрузка договоров...</div>;
    }

    return (
        <>
            <Title tier={2} classname="mb-2">
                Договоры
            </Title>
            <div className="space-y-3">
                <CreateContractCard onClick={() => setIsCreateModalOpen(true)} />

                {myContracts.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 mb-3"></h2>
                        <div className="space-y-3">
                            {myContracts.map((contract) => (
                                <ContractCard
                                    key={contract.id}
                                    contract={contract}
                                    onClaimReward={handleClaimReward}
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
                                    onClaimReward={handleClaimReward}
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
            />

            <SignContractModal
                contract={contractToSign}
                isOpen={!!contractToSign}
                onClose={() => setContractToSign(null)}
                onConfirm={handleSignContract}
                isLoading={isLoading}
            />
        </>
    );
};
