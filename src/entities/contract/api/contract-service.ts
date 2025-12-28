import type { AxiosResponse } from 'axios';
import { http } from '@/shared/api';
import type {
    IContractsResponse,
    ICreateContractRequest,
    ICreateContractResponse,
    IRevealContractRequest,
    IRevealContractResponse,
} from '../model/types';

const endpoints = {
    GET_CONTRACTS: '/player/contracts',
    CREATE_CONTRACT: '/contracts/create',
    SIGN_CONTRACT: (id: number) => `/contracts/${id}/sign`,
    REVEAL_CONTRACT: (id: number) => `/contracts/${id}/reveal`,
};

export const ContractService = {
    getContracts: (): Promise<AxiosResponse<IContractsResponse>> => {
        return http.get(endpoints.GET_CONTRACTS);
    },

    createContract: (
        payload: ICreateContractRequest,
    ): Promise<AxiosResponse<ICreateContractResponse>> => {
        return http.post(endpoints.CREATE_CONTRACT, payload);
    },

    signContract: (id: number): Promise<AxiosResponse<void>> => {
        return http.post(endpoints.SIGN_CONTRACT(id));
    },

    revealContract: (id: number, payload: IRevealContractRequest): Promise<AxiosResponse<IRevealContractResponse>> => {
        return http.post(endpoints.REVEAL_CONTRACT(id), payload);
    },
};
