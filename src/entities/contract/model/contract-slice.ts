import type { IMyContract, IReceivedContract, ICreateContractRequest } from './types';
import { ContractService } from '../api/contract-service';
import { contractsListMapper } from './mappers';
import type { ImmerSlice } from '@/app/store';
import { toast } from 'sonner';

export interface ContractStore {
    myContracts: IMyContract[];
    receivedContracts: IReceivedContract[];
    terminatedContracts: (IMyContract | IReceivedContract)[];
    isLoading: boolean;

    getContracts: () => Promise<void>;
    createContract: (payload: ICreateContractRequest) => Promise<void>;
    signContract: (contractId: number) => Promise<void>;
}

export const createContractSlice: ImmerSlice<ContractStore> = (set, get) => ({
    myContracts: [],
    receivedContracts: [],
    terminatedContracts: [],
    isLoading: false,

    getContracts: async () => {
        set((state) => {
            state.contract.isLoading = true;
        });

        try {
            const response = await ContractService.getContracts();
            const allContracts = contractsListMapper(response.data.contracts);

            const myContracts: IMyContract[] = [];
            const receivedContracts: IReceivedContract[] = [];
            const terminatedContracts: (IMyContract | IReceivedContract)[] = [];

            allContracts.forEach((contract) => {
                if (contract.status === 'terminated' || contract.status === 'completed') {
                    terminatedContracts.push(contract);
                    return;
                }

                if ('isCustomer' in contract) {
                    myContracts.push(contract);
                } else {
                    receivedContracts.push(contract);
                }
            });

            set((state) => {
                state.contract.myContracts = myContracts;
                state.contract.receivedContracts = receivedContracts;
                state.contract.terminatedContracts = terminatedContracts;
                state.contract.isLoading = false;
            });
        } catch {
            set((state) => {
                state.contract.myContracts = [];
                state.contract.receivedContracts = [];
                state.contract.terminatedContracts = [];
                state.contract.isLoading = false;
            });
            toast.error('Ошибка загрузки договоров');
        }
    },

    createContract: async (payload: ICreateContractRequest) => {
        try {
            await ContractService.createContract(payload);
            toast.success('Договор успешно создан!');

            await get().contract.getContracts();
        } catch {
            toast.error('Ошибка создания договора');
        }
    },

    signContract: async (contractId: number) => {
        try {
            await ContractService.signContract(contractId);
            toast.success('Договор успешно подписан!');

            await get().contract.getContracts();
        } catch {
            toast.error('Ошибка подписания договора');
        }
    },
});
