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

const createTransaction = async (
  createTransactionDto: CreateTransactionFormValues
) => {
  const response = await axiosInstance.post(
    endpoints.transactions.create,
    createTransactionDto
  );
  return response.data;
};

const useCreateTransactionMutation = (
  reset: UseFormReset<CreateTransactionFormValues>
) => {
  const queryClient = useQueryClient();
  const { resetAction } = useActionStore();

  return useMutation({
    mutationFn: createTransaction,
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
      toast.success(`Transaction created successfully.`);
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

export default useCreateTransactionMutation;
