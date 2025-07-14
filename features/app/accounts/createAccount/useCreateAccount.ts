import { CreateAccountFormValues } from "@/features/app/accounts/createAccount/createAccount.schema";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useActionStore } from "@/lib/stores/action.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

const createAccount = async (createAccountDto: CreateAccountFormValues) => {
  const response = await axiosInstance.post(
    endpoints.accounts.create,
    createAccountDto
  );
  return response.data;
};

const useCreateAccountMutation = (
  reset: UseFormReset<CreateAccountFormValues>,
  accountId?: string,
  categoryId?: string
) => {
  const queryClient = useQueryClient();
  const { resetAction } = useActionStore();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccounts],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetTransactions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccount, accountId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetCategory, categoryId],
      });
      toast.success(`Account created successfully.`);
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

export default useCreateAccountMutation;
