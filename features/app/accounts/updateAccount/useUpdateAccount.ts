import { Account } from "@/features/app/accounts/getAccounts/useGetAccounts";
import { PaginatedData } from "@/features/app/transactions/useGetTransactions";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useActionStore } from "@/lib/stores/action.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

interface ICreateAccountDto {
  name: string;
}

const updateAccount = async (
  createAccountDto: ICreateAccountDto,
  accountId: number
) => {
  const response = await axiosInstance.put(
    endpoints.accounts.update + `/${accountId}`,
    createAccountDto
  );
  return response.data;
};

const useUpdateAccountMutation = (
  reset: UseFormReset<ICreateAccountDto>,
  accountId: number
) => {
  const queryClient = useQueryClient();
  const { resetAction } = useActionStore();

  return useMutation({
    mutationFn: (dto: ICreateAccountDto) => updateAccount(dto, accountId),
    onSuccess: (data: Account) => {
      queryClient.setQueryData(
        [`${QueryKeys.useGetAccount + accountId}`],
        (prev: PaginatedData<Account>) => {
          return {
            ...prev,
            data: {
              ...prev.data,
              name: data.name,
            },
          };
        }
      );
      queryClient.setQueryData(
        [QueryKeys.useGetAccounts],
        (prev: Account[]) => {
          return prev.map((a) =>
            a.id === data.id ? { ...a, name: data.name } : a
          );
        }
      );
      toast.success(`Account updated successfully.`);
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

export default useUpdateAccountMutation;
