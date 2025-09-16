import { toast } from "sonner";
import { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";

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
