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

const createAccount = async (createAccountDto: ICreateAccountDto) => {
  const response = await axiosInstance.post(
    endpoints.accounts.create,
    createAccountDto
  );
  return response.data;
};

const useCreateAccountMutation = (reset: UseFormReset<ICreateAccountDto>) => {
  const queryClient = useQueryClient();
  const { resetAction } = useActionStore();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccounts],
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
