import { toast } from "sonner";
import { AxiosError } from "axios";
import { UseFormReset } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransactionFormValues } from "@/app/dashboard/transactions/hooks/create-transaction.schema";
import { Transaction } from "@/app/dashboard/transactions/hooks/use-get-transactions.query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";
import { useActionStore } from "@/lib/stores/action.store";

const editTransaction = async (
  createTransactionDto: CreateTransactionFormValues,
  transactionId: number
) => {
  const response = await axiosInstance.put(
    endpoints.transactions.update + `/${transactionId}`,
    createTransactionDto
  );
  return response.data;
};

const useUpdateTransactionMutation = (
  reset: UseFormReset<CreateTransactionFormValues>,
  transactionId: number
) => {
  const queryClient = useQueryClient();
  const { resetAction } = useActionStore();

  return useMutation({
    mutationFn: (dto: CreateTransactionFormValues) =>
      editTransaction(dto, transactionId),
    onSuccess: (data: Transaction) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetTransactions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccount, data.accountId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetCategory, data.categoryId],
      });
      toast.success(`Transaction updated successfully.`);
      reset();
      resetAction();
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

export default useUpdateTransactionMutation;
