import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: number;
  name: string;
  userId: number;
}

const getCategories = async () => {
  const response = await axiosInstance.get(endpoints.categories.getAll);
  return response.data;
};

const useGetCategories = () => {
  return useQuery<Category[]>({
    queryFn: getCategories,
    queryKey: [QueryKeys.useGetCategories],
  });
};

export default useGetCategories;
