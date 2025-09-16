import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { Category } from "@/app/dashboard/categories/hooks/use-get-categories.query";
import { Transaction } from "@/app/dashboard/transactions/hooks/use-get-transactions.query";
import { PaginatedData } from "@/interfaces/PaginatedData";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";

const getCategory = async (categoryId: number) => {
  const response = await axiosInstance.get(
    `${endpoints.categories.getAll}/${categoryId}`
  );
  return response.data;
};

const useGetCategoryQuery = (categoryId: number) => {
  return useQuery<PaginatedData<Transaction[], Category>>({
    queryFn: () => getCategory(categoryId),
    queryKey: [QueryKeys.useGetCategory, categoryId],
  });
};

export default useGetCategoryQuery;
