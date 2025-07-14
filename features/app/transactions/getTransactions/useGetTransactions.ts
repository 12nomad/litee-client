import { Account } from "@/features/app/accounts/getAccounts/useGetAccounts";
import { Category } from "@/features/app/categories/get-categories/useGetCategories";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { PaginatedData } from "@/features/interfaces/PaginatedData";
import { QueryKeys } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";

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

const useGetTransactions = () => {
  return useQuery<PaginatedData<Transaction[], null>>({
    queryFn: getTransactions,
    queryKey: [QueryKeys.useGetTransactions],
  });
};

export default useGetTransactions;
