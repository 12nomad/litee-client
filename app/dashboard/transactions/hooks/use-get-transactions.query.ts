import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { QueryKeys } from "@/constants/query-keys";
import { endpoints } from "@/constants/endpoints";
import { Category } from "@/app/dashboard/categories/hooks/use-get-categories.query";
import { Account } from "@/app/dashboard/accounts/hooks/use-get-accounts.query";
import { PaginatedData } from "@/interfaces/PaginatedData";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  payee: string;
  date: string;
  accountId: number;
  categoryId: number;
  userId: number;
  category: Category;
  account: Account;
}

const getTransactions = async () => {
  const response = await axiosInstance.get(endpoints.transactions.getAll);
  return response.data;
};

const useGetTransactionsQuery = () => {
  return useQuery<PaginatedData<Transaction[], null>>({
    queryFn: getTransactions,
    queryKey: [QueryKeys.useGetTransactions],
  });
};

export default useGetTransactionsQuery;
