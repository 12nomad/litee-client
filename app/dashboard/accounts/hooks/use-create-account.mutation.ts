import { toast } from "sonner";
import { AxiosError } from "axios";
import { UseFormReset } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { useActionStore } from "@/lib/stores/action.store";
import { CreateAccountFormValues } from "@/app/dashboard/accounts/hooks/create-account.schema";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";

const createAccount = async (createAccountDto: CreateAccountFormValues) => {
  const response = await axiosInstance.post(
    endpoints.accounts.create,
    createAccountDto
  );
  return response.data;
};

const useCreateAccountMutation = (
  reset: UseFormReset<CreateAccountFormValues>,
  accountId?: number,
  categoryId?: number
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
      if (accountId)
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.useGetAccount, accountId],
        });
      if (categoryId)
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
