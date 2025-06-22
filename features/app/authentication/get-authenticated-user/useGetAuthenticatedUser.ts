import { User } from "@/lib/stores/user.store";
import { axiosInstance } from "@/features/axios-instance";
import { endpoints } from "@/features/endpoints";
import { QueryKeys } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";

const getAuthenticatedUser = async () => {
  const response = await axiosInstance.get(
    endpoints.authentication.getAuthenticatedUser
  );
  return response.data;
};

const useGetAuthenticatedUser = () => {
  return useQuery<User>({
    queryFn: getAuthenticatedUser,
    queryKey: [QueryKeys.useGetAuthenticatedUser],
  });
};

export default useGetAuthenticatedUser;
