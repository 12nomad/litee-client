import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";

export interface Account {
  id: number;
  name: string;
  userId: number;
}

const getAccounts = async () => {
  const response = await axiosInstance.get(endpoints.accounts.getAll);
  return response.data;
};

const useGetAccountsQuery = (isEnabled: boolean) => {
  return useQuery<Account[]>({
    enabled: isEnabled,
    queryFn: getAccounts,
    queryKey: [QueryKeys.useGetAccounts],
    staleTime: Infinity,
  });
};

export default useGetAccountsQuery;
