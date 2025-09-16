import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { CreateCategoryFormValues } from "@/app/dashboard/categories/hooks/create-category.schema";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";

const createCategory = async (createCategoryDto: CreateCategoryFormValues) => {
  const response = await axiosInstance.post(
    endpoints.categories.create,
    createCategoryDto
  );
  return response.data;
};

const useCreateCategoryMutation = (
  reset: UseFormReset<CreateCategoryFormValues>,
  accountId?: number,
  categoryId?: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetCategories],
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
      toast.success(`Category created successfully.`);
      reset();
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

export default useCreateCategoryMutation;
