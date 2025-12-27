import { useAppStore } from '@/app/store';

export const useContract = () => useAppStore((state) => state.contract);

export const useMyContracts = () => useAppStore((state) => state.contract.myContracts);

export const useReceivedContracts = () => useAppStore((state) => state.contract.receivedContracts);

export const useTerminatedContracts = () =>
    useAppStore((state) => state.contract.terminatedContracts);

export const useContractLoading = () => useAppStore((state) => state.contract.isLoading);

export const useContractActions = () =>
    useAppStore((state) => ({
        getContracts: state.contract.getContracts,
        createContract: state.contract.createContract,
        signContract: state.contract.signContract,
    }));
