import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";
import { Account } from "@/app/dashboard/accounts/hooks/use-get-accounts.query";
import { Transaction } from "@/app/dashboard/transactions/hooks/use-get-transactions.query";
import { PaginatedData } from "@/interfaces/paginated-data";

const getAccount = async (accountId: number) => {
  const response = await axiosInstance.get(
    `${endpoints.accounts.getAll}/${accountId}`
  );
  return response.data;
};

const useGetAccountQuery = (accountId: number) => {
  return useQuery<PaginatedData<Transaction[], Account>>({
    queryFn: () => getAccount(accountId),
    queryKey: [QueryKeys.useGetAccount, accountId],
  });
};

export default useGetAccountQuery;
