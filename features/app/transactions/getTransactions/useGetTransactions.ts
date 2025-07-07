import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  accountId: number;
  userId: number;
}

const getTransactions = async () => {
  const response = await axiosInstance.get(endpoints.transactions.getAll);
  return response.data;
};

const useGetTransactions = () => {
  return useQuery<Transaction[]>({
    queryFn: getTransactions,
    queryKey: [QueryKeys.useGetTransactions],
  });
};

export default useGetTransactions;
