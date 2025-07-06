import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { toast } from "sonner";

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
      toast.success(`Account deleted successfully.`);
      redirect("/dashboard/overview");
    },
    onError: (error: AxiosError) => {
      if (
        error?.response?.data ||
        (error.message && error.message !== "NEXT_REDIRECT")
      ) {
        console.log(error);
        toast.error(`${(error?.response?.data as string) || error.message}.`);
      }
    },
  });
};

export default useDeleteAccountMutation;
