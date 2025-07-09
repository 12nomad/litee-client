import { Category } from "@/features/app/categories/get-categories/useGetCategories";
import { Transaction } from "@/features/app/transactions/getTransactions/useGetTransactions";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { PaginatedData } from "@/features/interfaces/PaginatedData";
import { QueryKeys } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";

const getCategory = async (categoryId: string) => {
  const response = await axiosInstance.get(
    `${endpoints.categories.getAll}/${categoryId}`
  );
  return response.data;
};

const useGetCategory = (categoryId: string) => {
  return useQuery<PaginatedData<Transaction[], Category>>({
    queryFn: () => getCategory(categoryId),
    queryKey: [`${QueryKeys.useGetCategory + "-" + categoryId}`],
  });
};

export default useGetCategory;
