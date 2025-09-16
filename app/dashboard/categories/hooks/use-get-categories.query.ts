import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios/axios-instance";
import { endpoints } from "@/constants/endpoints";
import { QueryKeys } from "@/constants/query-keys";

export interface Category {
  id: number;
  name: string;
  userId: number;
}

const getCategories = async () => {
  const response = await axiosInstance.get(endpoints.categories.getAll);
  return response.data;
};

const useGetCategoriesQuery = () => {
  return useQuery<Category[]>({
    queryFn: getCategories,
    queryKey: [QueryKeys.useGetCategories],
  });
};

export default useGetCategoriesQuery;
