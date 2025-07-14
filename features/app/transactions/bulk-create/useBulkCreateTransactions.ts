import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface IBulkCreateDto {
  [key: string]: string | number;
}

const bulkCreate = async (bulkCreateDto: {
  transactions: IBulkCreateDto[];
}) => {
  const response = await axiosInstance.post(
    endpoints.transactions.bulkCreate,
    bulkCreateDto
  );
  return response.data;
};

const useBulkCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkCreate,
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
      toast.success("Transactions created successfully.");
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

export default useBulkCreateMutation;
