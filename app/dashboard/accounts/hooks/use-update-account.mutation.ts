import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { useActionStore } from "@/lib/stores/action.store";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { Account } from "@/app/dashboard/accounts/hooks/use-get-accounts.query";
import { Transaction } from "@/app/dashboard/transactions/hooks/use-get-transactions.query";
import { endpoints } from "@/constants/endpoints";
import { PaginatedData } from "@/interfaces/PaginatedData";
import { QueryKeys } from "@/constants/query-keys";

interface ICreateAccountDto {
  name: string;
}

const updateAccount = async (
  createAccountDto: ICreateAccountDto,
  accountId?: number
) => {
  if (!accountId) return toast.error("Invalid operation: missing accountId.");

  const response = await axiosInstance.put(
    endpoints.accounts.update + `/${accountId}`,
    createAccountDto
  );
  return response.data;
};

const useUpdateAccountMutation = (
  reset: UseFormReset<ICreateAccountDto>,
  accountId?: number
) => {
  const queryClient = useQueryClient();
  const { resetAction } = useActionStore();

  return useMutation({
    mutationFn: (dto: ICreateAccountDto) => updateAccount(dto, accountId),
    onSuccess: (data: Account) => {
      queryClient.setQueryData(
        [QueryKeys.useGetAccount, accountId],
        (prev: PaginatedData<Transaction[], Account>) => {
          return {
            ...prev,
            extra: {
              ...prev?.extra,
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
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetTransactions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetCategory],
      });
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
