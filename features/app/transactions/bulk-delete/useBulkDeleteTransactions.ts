import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface IBulkDeleteDto {
  transactionIds: number[];
}

const bulkDelete = async (bulkDeleteDto: IBulkDeleteDto) => {
  const response = await axiosInstance.post(
    endpoints.transactions.bulkDelete,
    bulkDeleteDto
  );
  return response.data;
};

const useBulkDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetTransactions],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccount],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetCategory],
      });
      toast.success("Transactions deleted successfully.");
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

export default useBulkDeleteMutation;
