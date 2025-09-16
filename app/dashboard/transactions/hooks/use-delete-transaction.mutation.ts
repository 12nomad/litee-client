import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";

const deleteTransaction = async (transactionId: number) => {
  const response = await axiosInstance.delete(
    endpoints.transactions.delete + `/${transactionId}`
  );
  return response.data;
};

const useDeleteTransactionMutation = (
  transactionId: number,
  accountId?: number,
  categoryId?: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTransaction(transactionId),
    onSuccess: () => {
      // !FIXME: not quite sure about the paginated data
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetTransactions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccount, accountId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetCategory, categoryId],
      });
      toast.success("Transactions deleted successfully.");
    },
    onError: (error: AxiosError) => {
      if (
        error?.response?.data ||
        (error.message && error.message !== "NEXT_REDIRECT")
      )
        toast.error(`${(error?.response?.data as string) || error.message}.`);
    },
  });
};

export default useDeleteTransactionMutation;
