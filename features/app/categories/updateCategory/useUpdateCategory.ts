import { Category } from "@/features/app/categories/get-categories/useGetCategories";
import { Transaction } from "@/features/app/transactions/getTransactions/useGetTransactions";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { PaginatedData } from "@/features/interfaces/PaginatedData";
import { QueryKeys } from "@/features/query-keys";
import { useActionStore } from "@/lib/stores/action.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

interface ICreateCategoryDto {
  name: string;
}

const updateCategory = async (
  createCategoryDto: ICreateCategoryDto,
  categoryId: number
) => {
  const response = await axiosInstance.put(
    endpoints.categories.update + `/${categoryId}`,
    createCategoryDto
  );
  return response.data;
};

const useUpdateCategoryMutation = (
  reset: UseFormReset<ICreateCategoryDto>,
  categoryId: number
) => {
  const queryClient = useQueryClient();
  const { resetAction } = useActionStore();

  return useMutation({
    mutationFn: (dto: ICreateCategoryDto) => updateCategory(dto, categoryId),
    onSuccess: (data: Category) => {
      queryClient.setQueryData(
        [QueryKeys.useGetCategory, categoryId],
        (prev: PaginatedData<Transaction[], Category>) => {
          return {
            ...prev,
            extra: {
              ...prev.extra,
              name: data.name,
            },
          };
        }
      );
      queryClient.setQueryData(
        [QueryKeys.useGetCategories],
        (prev: Category[]) => {
          return prev.map((a) =>
            a.id === data.id ? { ...a, name: data.name } : a
          );
        }
      );
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetTransactions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccount],
      });
      toast.success(`Category updated successfully.`);
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

export default useUpdateCategoryMutation;
