import { toast } from "sonner";
import { AxiosError } from "axios";
import { UseFormReset } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { Category } from "@/app/dashboard/categories/hooks/use-get-categories.query";
import { Transaction } from "@/app/dashboard/transactions/hooks/use-get-transactions.query";
import { useActionStore } from "@/lib/stores/action.store";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";
import { PaginatedData } from "@/interfaces/PaginatedData";

interface ICreateCategoryDto {
  name: string;
}

const updateCategory = async (
  createCategoryDto: ICreateCategoryDto,
  categoryId?: number
) => {
  if (!categoryId) return toast.error("Invalid operation: missing categoryId.");

  const response = await axiosInstance.put(
    endpoints.categories.update + `/${categoryId}`,
    createCategoryDto
  );
  return response.data;
};

const useUpdateCategoryMutation = (
  reset: UseFormReset<ICreateCategoryDto>,
  categoryId?: number
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
              ...prev?.extra,
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
