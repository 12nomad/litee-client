import { toast } from "sonner";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";

const deleteAccount = async (accountId: number) => {
  const response = await axiosInstance.delete(
    endpoints.accounts.delete + `/${accountId}`
  );
  return response.data;
};

const useDeleteAccountMutation = (accountId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccounts],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetTransactions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetCategory],
      });
      toast.success(`Account deleted successfully.`);
      redirect("/dashboard/overview");
    },
    onError: (error: AxiosError) => {
      if (
        error?.response?.data ||
        (error.message && error.message !== "NEXT_REDIRECT")
      ) {
        toast.error(`${(error?.response?.data as string) || error.message}.`);
      }
    },
  });
};

export default useDeleteAccountMutation;
