import { CreateContractCard } from '@/entities/contract';
import { Title } from '@/shared/ui/title';

export const ContractsSection = () => {
    return (
        <>
            <Title tier={2} classname="mb-2">
                Договоры
            </Title>
            <CreateContractCard onClick={() => {}} />
        </>
    );
};
