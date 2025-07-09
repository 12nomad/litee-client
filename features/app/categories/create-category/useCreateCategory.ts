import { CreateCategoryFormValues } from "@/features/app/categories/create-category/createCategory.schema";
import { Category } from "@/features/app/transactions/getTransactions/useGetTransactions";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

const createCategory = async (createCategoryDto: CreateCategoryFormValues) => {
  const response = await axiosInstance.post(
    endpoints.categories.create,
    createCategoryDto
  );
  return response.data;
};

const useCreateCategoryMutation = (
  reset: UseFormReset<CreateCategoryFormValues>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data: Category) => {
      queryClient.setQueryData(
        [QueryKeys.useGetCategories],
        (prev: Category[]) => {
          return [...prev, data];
        }
      );
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
