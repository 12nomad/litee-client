import { CreateTransactionFormValues } from "@/features/app/transactions/createTransaction/createTransaction.schema";
import { Transaction } from "@/features/app/transactions/getTransactions/useGetTransactions";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useActionStore } from "@/lib/stores/action.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

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
        queryKey: [`${QueryKeys.useGetAccount + "-" + data.accountId}`],
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
