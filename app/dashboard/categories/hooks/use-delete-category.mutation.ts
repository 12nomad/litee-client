import { toast } from "sonner";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";

const deleteCategory = async (categoryId: number) => {
  const response = await axiosInstance.delete(
    endpoints.categories.delete + `/${categoryId}`
  );
  return response.data;
};

const useDeleteCategoryMutation = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetCategories],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetTransactions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccount],
      });
      toast.success(`Category deleted successfully.`);
      redirect("/dashboard/overview");
    },
    onError: (error: AxiosError) => {
      if (
        error?.response?.data ||
        (error.message && error.message !== "NEXT_REDIRECT")
      ) {
        toast.error(`${(error?.response?.data as string) || error.message}.`);
      }
    },
  });
};

export default useDeleteCategoryMutation;
