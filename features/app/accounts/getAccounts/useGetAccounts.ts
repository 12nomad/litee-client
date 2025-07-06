import { Transaction } from "@/features/app/transactions/useGetTransactions";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";

export interface Account {
  id: number;
  name: string;
  transactions: Transaction[] | [];
  userId: number;
}

const getAccounts = async () => {
  const response = await axiosInstance.get(endpoints.accounts.getAll);
  return response.data;
};

const useGetAccounts = () => {
  return useQuery<Account[]>({
    queryFn: getAccounts,
    queryKey: [QueryKeys.useGetAccounts],
    staleTime: Infinity,
  });
};

export default useGetAccounts;
