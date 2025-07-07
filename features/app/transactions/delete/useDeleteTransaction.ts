import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const deleteTransaction = async (transactionId: number) => {
  const response = await axiosInstance.delete(
    endpoints.transactions.delete + `/${transactionId}`
  );
  return response.data;
};

const useDeleteTransactionMutation = (
  transactionId: number,
  accountId: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTransaction(transactionId),
    onSuccess: () => {
      // !FIXME: not quite sure about the paginated data
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.useGetAccount + "-" + accountId}`],
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
