import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { toast } from "sonner";

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
