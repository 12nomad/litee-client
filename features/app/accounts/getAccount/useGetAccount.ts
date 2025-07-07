import { Account } from "@/features/app/accounts/getAccounts/useGetAccounts";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { PaginatedData } from "@/features/interfaces/PaginatedData";
import { QueryKeys } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";

const getAccount = async (accountId: string) => {
  const response = await axiosInstance.get(
    `${endpoints.accounts.getAll}/${accountId}`
  );
  return response.data;
};

const useGetAccount = (accountId: string) => {
  return useQuery<PaginatedData<Account>>({
    queryFn: () => getAccount(accountId),
    queryKey: [`${QueryKeys.useGetAccount + "-" + accountId}`],
  });
};

export default useGetAccount;
