import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";

export interface Account {
  id: number;
  name: string;
  userId: number;
}

const getAccounts = async () => {
  const response = await axiosInstance.get(endpoints.accounts.getAll);
  return response.data;
};

const useGetAccounts = (isEnabled: boolean) => {
  return useQuery<Account[]>({
    enabled: isEnabled,
    queryFn: getAccounts,
    queryKey: [QueryKeys.useGetAccounts],
    staleTime: Infinity,
  });
};

export default useGetAccounts;
